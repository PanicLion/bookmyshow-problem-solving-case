const router = require('express').Router();
const { movies, getMovieData } = require('../controllers/movie.controller');
const { addComment, getComments } = require('../controllers/comment.controller');


router.get('/', movies);

router.get('/:id', getMovieData);

router.get('/:id/comments', getComments);

router.post('/:id/comments', addComment);

module.exports = router;
