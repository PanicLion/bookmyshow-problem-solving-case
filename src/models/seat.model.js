const sequelize = require('../connections/mysql.connection').sequelize;
const { DataTypes } = require('sequelize');


const CinemaSeat = sequelize.define("cinema_seats", {
    row: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    seat_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("CLASSIC", "PRIME", "RECLINER"),
        allowNull: false
    }
});


const ShowSeat = sequelize.define("show_seats", {
    seat_no: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = { CinemaSeat, ShowSeat };
