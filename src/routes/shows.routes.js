const router = require('express').Router();
const shows = require('../controllers/show.controller');
const dates = require('../controllers/date.controller');
const availableSeats = require('../controllers/seat.controller');


router.get('/:showId/seatlayout', availableSeats);

router.get('/:cityId/:cinemaId/', dates);

router.get('/:cityId/:cinemaId/:date', shows);


module.exports = router;
