// const sequelize = require('../connections/mysql.connection');
const City = require('../models/city.model');


async function getCities() {
    const cities = await City.findAll({
        attributes: ['id', 'name']
    });
    return cities;
}

module.exports = getCities;
