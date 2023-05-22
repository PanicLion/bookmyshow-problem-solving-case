const getCities = require('../services/city.services');


async function cities() {
    let cities = await getCities();

    for (city of cities) {
        city.dataValues.cinemas = `http://localhost:3000/city/${city.dataValues.id}/cinemas`
    }
    return cities;
}

module.exports = cities;
