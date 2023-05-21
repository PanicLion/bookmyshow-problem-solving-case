const sequelize = require('../connections/mysql.connection').sequelize;
const { DataTypes } = require('sequelize');


const Cinema = sequelize.define("cinemas", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const CinemaHall = sequelize.define("cinema_halls", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


module.exports = { Cinema, CinemaHall };
