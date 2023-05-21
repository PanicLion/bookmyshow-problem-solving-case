const getDates = require('../services/date.services');


const dates = async (req, res) => {
    try {
        let dates = await getDates();
        const cityId = req.params['cityId'];
        const cinemaId = req.params['cinemaId'];
        result = {};
        result[dates[0][0].day1] = `http://localhost:3000/shows/${cityId}/${cinemaId}/${dates[0][0].day1}`;
        result[dates[0][0].day2] = `http://localhost:3000/shows/${cityId}/${cinemaId}/${dates[0][0].day2}`;
        result[dates[0][0].day3] = `http://localhost:3000/shows/${cityId}/${cinemaId}/${dates[0][0].day3}`;
        result[dates[0][0].day4] = `http://localhost:3000/shows/${cityId}/${cinemaId}/${dates[0][0].day4}`;
        result[dates[0][0].day5] = `http://localhost:3000/shows/${cityId}/${cinemaId}/${dates[0][0].day5}`;
        result[dates[0][0].day6] = `http://localhost:3000/shows/${cityId}/${cinemaId}/${dates[0][0].day6}`;
        result[dates[0][0].day7] = `http://localhost:3000/shows/${cityId}/${cinemaId}/${dates[0][0].day7}`;

        return res.status(200).send({
             "Select a date to view available shows: ": result
        });
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
};

module.exports = dates;
