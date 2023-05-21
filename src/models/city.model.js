const sequelize = require('../connections/mysql.connection').sequelize;
const { DataTypes } = require('sequelize');


const City = sequelize.define("cities", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = City;
