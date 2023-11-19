const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../utils/errorResponse');
const routes = require('../utils/routes');
const { Users } = require('../models');
const { StatusCodes } = require('../utils/constants');

// 가입 유효성 검사 함수
const validateSignupData = (email, password, confirmPassword, name) => {
  if (!email || !password || !confirmPassword || !name) {
    throw createError(StatusCodes.BAD_REQUEST, '모든 필드를 채워주세요.');
  }

  if (password !== confirmPassword) {
    throw createError(StatusCodes.BAD_REQUEST, '비밀번호가 일치하지 않습니다.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createError(StatusCodes.BAD_REQUEST, '올바른 이메일 형식이 아닙니다.');
  }
};

// 회원가입 API
router.post(routes.SIGNUP, async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    validateSignupData(email, password, confirmPassword, name);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(StatusCodes.CREATED).json({ message: '회원가입이 완료되었습니다.', token });
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
      throw createError(StatusCodes.NOT_FOUND, '해당 사용자를 찾을 수 없습니다.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createError(StatusCodes.BAD_REQUEST, '비밀번호가 일치하지 않습니다.');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(StatusCodes.OK).json({ message: '로그인에 성공했습니다.', token });
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
