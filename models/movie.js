const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Страна обязательное поле'],
  },
  director: {
    type: String,
    required: [true, 'Режиссёр обязательное поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Длительность обязательное поле'],
  },
  year: {
    type: String,
    required: [true, 'Год обязательное поле'],
  },
  description: {
    type: String,
    required: [true, 'Описание обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'Постер обязательное поле'],
    validate: {
      validator: (v) => /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(v),
      message: 'Пожалуйста, введите корректную ссылку',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Трейлер обязательное поле'],
    validate: {
      validator: (v) => /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(v),
      message: 'Пожалуйста, введите корректную ссылку',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Изображение постера обязательное поле'],
    validate: {
      validator: (v) => /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(v),
      message: 'Пожалуйста, введите корректную ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  movieId: {
    type: Number,
    required: [true, 'Id фильма обязательное поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'Название RU обязательное поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Название EN обязательное поле'],
  },
}, { versionKey: false });

module.exports = mongoose.model('Movie', movieSchema);
