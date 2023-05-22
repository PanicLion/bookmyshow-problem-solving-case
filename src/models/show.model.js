const sequelize = require('../connections/mysql.connection').sequelize;
const { DataTypes } = require('sequelize');


const Show = sequelize.define("shows", {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
});


module.exports = Show;
