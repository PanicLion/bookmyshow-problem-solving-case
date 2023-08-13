const router = require('express').Router();
const searchResults = require('../controllers/search.controller');


router.get('/', searchResults);


module.exports = router;
