const jwt = require('jsonwebtoken');
const { StatusCodes } = require('../utils/constants');

// 토큰 유효성 검사
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: '인증에 실패했습니다.' });
  }

  const jwtToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.locals = {
      user: decoded,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: '토큰이 만료되었습니다.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: '유효하지 않은 토큰입니다.' });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: '인증에 실패했습니다.' });
    }
  }
};

// 사용자 유효성 검사
const authenticateUser = async (req, res, next) => {
  try {
    // 여기서 필요한 사용자 인증 로직을 구현하세요.
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: '사용자 인증에 실패했습니다.' });
  }
};

module.exports = {
  verifyToken,
  authenticateUser,
};
