const sequelize = require('../connections/mysql.connection').sequelize;
const { DataTypes } = require('sequelize');


const Booking = sequelize.define("bookings", {
    no_of_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Booking;
