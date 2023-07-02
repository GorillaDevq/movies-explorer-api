const CREATE_CODE = 201;
const DEFAULT_ERROR_CODE = 500;
const DUPLICATE_ERROR_CODE = 11000;

const VALIDATION_ERROR_NAME = 'ValidationError';
const FORBIDDEN_ERROR_MESSAGE = 'Нет доступа';
const CAST_ERROR_NAME = 'CastError';

const DUPLICATE_ERROR_MESSAGE = 'Указан существующий email';
const USER_CREATE_VALIDATION_ERROR_MESSAGE = 'Переданы некорректные данные при создании пользователя';
const USER_SIGNIN_MESSAGE = 'Успешный вход';
const USER_SIGNOUT_MESSAGE = 'Успешный выход';
const USER_NOT_FOUND_ERROR_MESSAGE = 'Пользователь по указанному _id не найден';
const USER_UPDATE_VALIDATION_ERROR_MESSAGE = 'Переданы некорректные данные при обновлении профиля';

const MOVIE_POST_VALIDATION_ERROR_MESSAGE = 'Переданы некорректные данные для сохранения фильма';
const MOVIE_NOT_FOUNG_ERROR_MESSAGE = 'Фильм с указанным _id не найден';
const MOVIE_DELETE_MESSAGE = 'Фильм успешно удален';
const MOVIE_DELETE_VALIDATION_ERROR_MESSAGE = 'Переданы некорректные данные для удаления фильма';

const NULL_TOKEN_UNAUTHORIZED_ERROR_MESSAGE = 'Ошибка авторизации.';
const MISMATCH_TOKEN_UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';

const ROUTE_NOT_FOUND_ERROR_MESSAGE = 'Указанный адресс не существует';

const URL_REGEX = /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;

const FILENAME_REQUEST_LOG = 'request.log';
const FILENAME_ERROR_LOG = 'error.log';

const allowedCors = [
  'http:188.233.6.148',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://GDQ.movies-explorer.nomoredomains.monster',
  'http://GDQ.movies-explorer.nomoredomains.monster',
  'http://gdq.movies-explorer.nomoredomains.monster',
  'https://gdq.movies-explorer.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  CREATE_CODE,
  DEFAULT_ERROR_CODE,
  DUPLICATE_ERROR_CODE,
  DUPLICATE_ERROR_MESSAGE,
  VALIDATION_ERROR_NAME,
  USER_CREATE_VALIDATION_ERROR_MESSAGE,
  USER_SIGNIN_MESSAGE,
  USER_SIGNOUT_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  USER_UPDATE_VALIDATION_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  CAST_ERROR_NAME,
  MOVIE_POST_VALIDATION_ERROR_MESSAGE,
  MOVIE_NOT_FOUNG_ERROR_MESSAGE,
  MOVIE_DELETE_MESSAGE,
  MOVIE_DELETE_VALIDATION_ERROR_MESSAGE,
  NULL_TOKEN_UNAUTHORIZED_ERROR_MESSAGE,
  MISMATCH_TOKEN_UNAUTHORIZED_ERROR_MESSAGE,
  URL_REGEX,
  FILENAME_REQUEST_LOG,
  FILENAME_ERROR_LOG,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  ROUTE_NOT_FOUND_ERROR_MESSAGE,
};
