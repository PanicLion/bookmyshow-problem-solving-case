require('dotenv').config();
const env = process.env;


const MYSQL_URI = {
    db: env.MYSQL_DB,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    options: {
        host: env.MYSQL_HOST,
        dialect: 'mysql'
    }
};

module.exports = MYSQL_URI;
