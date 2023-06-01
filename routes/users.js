const router = require('express').Router();

const auth = require('../middlewares/auth');
const { getUserInfo, updateUser } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/celebrateValidators');

router.get('/me', auth, getUserInfo);

router.patch('/me', auth, updateUserValidator, updateUser);

module.exports = router;
