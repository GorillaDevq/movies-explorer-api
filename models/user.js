const mongoose = require('mongoose');
const findUserByCredentials = require('../utils/findUserByCredentials');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: 'Пожалуйста, введите корректный email',
    },
    required: [true, 'Email обязательное поле'],
  },
  password: {
    type: String,
    required: [true, 'Password обязательное поле'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Name обязательное поле'],
    minLength: 2,
    maxLength: 30,
  },
}, { versionKey: false });

userSchema.static('findUserByCredentials', findUserByCredentials);

module.exports = mongoose.model('User', userSchema);
