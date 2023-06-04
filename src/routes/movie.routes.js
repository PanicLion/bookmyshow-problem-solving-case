const router = require('express').Router();
const movies = require('../controllers/movie.controller');


router.get('/', movies);

module.exports = router;
