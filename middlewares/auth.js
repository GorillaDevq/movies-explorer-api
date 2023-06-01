const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  NULL_TOKEN_UNAUTHORIZED_ERROR_MESSAGE,
  MISMATCH_TOKEN_UNAUTHORIZED_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  if (!req.cookies.token) return next(new UnauthorizedError(NULL_TOKEN_UNAUTHORIZED_ERROR_MESSAGE));

  let payload;

  try {
    payload = jwt.verify(req.cookies.token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError(MISMATCH_TOKEN_UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = payload;

  return next();
};
