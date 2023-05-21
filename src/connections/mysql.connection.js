const Sequelize = require('sequelize');
const MYSQL_URI = require('../configs/mysql.config');


const sequelize = new Sequelize(
    MYSQL_URI.db, 
    MYSQL_URI.username, 
    MYSQL_URI.password, 
    MYSQL_URI.options
);

const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to the database.");
    } catch (err) {
        console.log(err)
    }
};

module.exports = { sequelize, connectToDB };
