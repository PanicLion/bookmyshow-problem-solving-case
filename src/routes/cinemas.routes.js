const router = require('express').Router();
const cinemas = require('../controllers/cinema.controller');


router.get('/:cityId/cinemas', cinemas);

module.exports = router;
