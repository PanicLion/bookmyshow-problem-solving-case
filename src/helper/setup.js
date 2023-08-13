const sequelize = require('../connections/mysql.connection').sequelize;
const applyExtraSetup = require('../extra-setup');
const populateDB = require('./bulk_create');

async function reset () {
    applyExtraSetup();
    await sequelize.sync({ force: true });
    await populateDB();
};

module.exports = reset;
