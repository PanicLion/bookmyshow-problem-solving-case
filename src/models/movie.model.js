const sequelize = require('../connections/mysql.connection').sequelize;
const { DataTypes } = require('sequelize');


const Movie = sequelize.define("movies", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genere: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Movie;
