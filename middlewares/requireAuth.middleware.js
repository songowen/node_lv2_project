const jwt = require('jsonwebtoken');
const { StatusCodes, ErrorMessages } = require('../utils/constants');

const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ErrorMessages.AUTHENTICATION_REQUIRED,
      });
    }

    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // 인증된 사용자 정보를 request 객체에 추가

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: ErrorMessages.AUTHENTICATION_REQUIRED,
    });
  }
};

module.exports = requireAuth;
