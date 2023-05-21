const sequelize = require('../connections/mysql.connection').sequelize;
const { QueryTypes } = require('sequelize');


async function getDates() {
    try {
        const dates = await sequelize.query(
            "SELECT curdate() AS day1, \
                curdate()+ interval 1 day AS day2, \
                curdate()+ interval 2 day AS day3, \
                curdate()+ interval 3 day AS day4, \
                curdate()+ interval 4 day AS day5, \
                curdate()+ interval 5 day AS day6, \
                curdate()+ interval 6 day AS day7",
            {
                types: QueryTypes.SELECT
            }
        );
        return dates;
    } catch (err) {
        console.log(err)
    }
}

module.exports = getDates;
