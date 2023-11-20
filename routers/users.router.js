class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const routes = require('../utils/routes');
const { Users } = require('../models');
const { StatusCodes } = require('../utils/constants');

// 가입 유효성 검사 함수
const validateSignupData = (email, password, confirmPassword, name) => {
if (!email || !password || !confirmPassword || !name) {
  throw new ErrorResponse(StatusCodes.BAD_REQUEST, '모든 필드를 채워주세요.');
}

if (password !== confirmPassword) {
  throw new ErrorResponse(StatusCodes.BAD_REQUEST, '비밀번호가 일치하지 않습니다.');
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new ErrorResponse(StatusCodes.BAD_REQUEST, '올바른 이메일 형식이 아닙니다.');
}
};

// 회원가입 API
router.post('/signup', async (req, res) => {
try {
  const { email, password, confirmPassword, name } = req.body;
  console.log(req.body)

  validateSignupData(email, password, confirmPassword, name);

  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, '이미 등록된 이메일입니다.');
  }
  
  console.log( email,  name)
try{
  const user = new Users({ email, password , name });
  
console.log(user)
  await user.save();
  res.status(StatusCodes.CREATED).json({ message: '회원가입이 완료되었습니다.' });
  return 
}
  catch(error){
    console.log(error)
  }

  // 이메일 중복 검사 추가

} catch (error) {
  console.error(error.message);
  res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || '서버 오류가 발생했습니다.' });
}
});

// 로그인 API
router.post(routes.LOGIN, async (req, res) => {
try {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, '해당 사용자를 찾을 수 없습니다.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
console.log(passwordMatch)
  if (!passwordMatch) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, '비밀번호가 일치하지 않습니다.');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });

  res.status(StatusCodes.OK).json({ message: '로그인에 성공했습니다.', token });
} catch (error) {
  console.error(error.message);
  res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || '서버 오류가 발생했습니다.' });
}
});

module.exports = router;
