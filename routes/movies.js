const router = require('express').Router();

const auth = require('../middlewares/auth');
const { getSavedMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { postMovieValidator, deleteMovieValidator } = require('../middlewares/celebrateValidators');

router.get('/', auth, getSavedMovies);

router.post('/', auth, postMovieValidator, postMovie);

router.delete('/:movieId', auth, deleteMovieValidator, deleteMovie);

module.exports = router;
