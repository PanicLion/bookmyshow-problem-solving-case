const Cinema = require('../models/cinema.model').Cinema;
const City = require('../models/city.model');


async function getCinemasByCityId(cityId) {
    const cinemas = await Cinema.findAll({
        attributes: [
            'id',
            'name',
            'cityId'
        ],
        where: {
            cityId: cityId
        }
    });
    return cinemas;
}

module.exports = getCinemasByCityId;
