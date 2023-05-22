const Cinema = require('../models/cinema.model').Cinema;
const City = require('../models/city.model');


async function getCinemasByCityId(cityId) {
    const cinemas = await Cinema.findAll({
        include: {
            model: City,
            attributes: ['name']
        },
        attributes: [
            'id',
            'name'
        ],
        where: {
            cityId: cityId
        }
    });
    return cinemas;
}

module.exports = getCinemasByCityId;
