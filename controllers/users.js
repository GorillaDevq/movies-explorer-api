const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  CREATE_CODE,
  DUPLICATE_ERROR_CODE,
  DUPLICATE_ERROR_MESSAGE,
  VALIDATION_ERROR_NAME,
  USER_CREATE_VALIDATION_ERROR_MESSAGE,
  USER_SIGNIN_MESSAGE,
  USER_SIGNOUT_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  USER_UPDATE_VALIDATION_ERROR_MESSAGE,
} = require('../utils/constants');

// GET USER INFO
const getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => res.send(user))
    .catch(next);
};

// REGISTER USER
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, password: hash, email }))
    .then((user) => {
      const userConfig = user.toObject();
      delete userConfig.password;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('token', token, {
        httpOnly: true,
      });
      res.status(CREATE_CODE).send(userConfig);
    })
    .catch((err) => {
      if (err.code === DUPLICATE_ERROR_CODE) next(new ConflictError(DUPLICATE_ERROR_MESSAGE));
      else if (err.name === VALIDATION_ERROR_NAME) next(new ValidationError(USER_CREATE_VALIDATION_ERROR_MESSAGE));
      else next(err);
    });
};

// LOGIN USER
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('token', token, {
        httpOnly: true,
      });
      res.send({ message: USER_SIGNIN_MESSAGE });
    })
    .catch(next);
};

// LOGOUT USER
const logout = (_, res) => {
  res.cookie('token', 'asd', {
    maxAge: 100,
    httpOnly: true,
  });
  res.send({ message: USER_SIGNOUT_MESSAGE });
};

// UPDATE USER DATA
const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) next(new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE));
      else res.send(user);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) next(new ValidationError(USER_UPDATE_VALIDATION_ERROR_MESSAGE));
      else next(err);
    });
};

// CHECK TOKEN
const checkToken = (req, res) => {
  res.send({ message: 'Успешный вход' });
};

module.exports = { getUserInfo, createUser, login, logout, updateUser, checkToken };
