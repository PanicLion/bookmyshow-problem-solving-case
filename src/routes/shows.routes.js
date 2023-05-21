const router = require('express').Router();
const shows = require('../controllers/show.controller');
const dates = require('../controllers/date.controller');


router.get('/:cityId/:cinemaId/:date', shows);

router.get('/:cityId/:cinemaId/', dates);

module.exports = router;
