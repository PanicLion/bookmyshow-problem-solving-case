const router = require('express').Router();
const tickets = require('../controllers/booking.controller');


router.post('/:showId/:date', tickets);

module.exports = router;
