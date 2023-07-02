const rootRouter = require('express').Router();

const movieRouter = require('./movies');
const userRouter = require('./users');

const auth = require('../middlewares/auth');
const { createUser, login, logout, checkToken } = require('../controllers/users');
const { registerValidator, loginValidator } = require('../middlewares/celebrateValidators');

rootRouter.post('/signup', registerValidator, createUser);

rootRouter.post('/signin', loginValidator, login);

rootRouter.delete('/signout', auth, logout);

rootRouter.get('/token', auth, checkToken);

rootRouter.use('/movies', movieRouter);
rootRouter.use('/users', userRouter);

module.exports = rootRouter;
