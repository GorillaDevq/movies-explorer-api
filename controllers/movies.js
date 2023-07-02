const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

const {
  VALIDATION_ERROR_NAME,
  FORBIDDEN_ERROR_MESSAGE,
  CAST_ERROR_NAME,
  MOVIE_POST_VALIDATION_ERROR_MESSAGE,
  MOVIE_NOT_FOUNG_ERROR_MESSAGE,
  MOVIE_DELETE_VALIDATION_ERROR_MESSAGE,
} = require('../utils/constants');

// GET SAVED MOVIES
const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch((next));
};

// POST MOVIES
const postMovie = (req, res, next) => {
  const { ...movieData } = req.body;
  Movie.create({ ...movieData, owner: req.user._id })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) next(new ValidationError(MOVIE_POST_VALIDATION_ERROR_MESSAGE));
      else next(err);
    });
};

// DELETE MOVIE
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) next(new NotFoundError(MOVIE_NOT_FOUNG_ERROR_MESSAGE));
      else if (req.user._id.toString() === movie.owner._id.toString()) {
        Movie.deleteOne({ _id: movieId })
          .then(() => res.send(movie))
          .catch(next);
      } else next(new ForbiddenError(FORBIDDEN_ERROR_MESSAGE));
    })
    .catch((err) => {
      if (err.name === CAST_ERROR_NAME) next(new ValidationError(MOVIE_DELETE_VALIDATION_ERROR_MESSAGE));
      else next(err);
    });
};

module.exports = { getSavedMovies, postMovie, deleteMovie };
