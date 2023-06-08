const sequelize = require('../connections/mysql.connection').sequelize;
const City = require('../models/city.model');
const Movie = require('../models/movie.model');
const { Cinema, CinemaHall } = require('../models/cinema.model');
const Show = require('../models/show.model');
const CinemaSeat = require('../models/seat.model').CinemaSeat;
const Comment = require('../models/comment.model');
const dummy_data = require('./dummy_data');


async function populateDB() {
    await City.bulkCreate(dummy_data.cityData);

    await Movie.bulkCreate(dummy_data.movieData);

    await Cinema.bulkCreate(dummy_data.cinemaData);

    await CinemaHall.bulkCreate(dummy_data.cinemaHallData);

    await Show.bulkCreate(dummy_data.showData);

    await CinemaSeat.bulkCreate(dummy_data.cinemaSeatData);

    await Comment.bulkCreate(dummy_data.comments);

    await updateShows();
}

async function updateShows() {
    await sequelize.query('UPDATE shows SET date = curdate() where date = "2023-05-20"');
    await sequelize.query('UPDATE shows SET date = curdate()+ INTERVAL 1 day where date = "2023-05-21"');
    await sequelize.query('UPDATE shows SET date = curdate()+ INTERVAL 2 day where date = "2023-05-22"');
    await sequelize.query('UPDATE shows SET date = curdate()+ INTERVAL 3 day where date = "2023-05-23"');
    await sequelize.query('UPDATE shows SET date = curdate()+ INTERVAL 4 day where date = "2023-05-24"');
    await sequelize.query('UPDATE shows SET date = curdate()+ INTERVAL 5 day where date = "2023-05-25"');
    await sequelize.query('UPDATE shows SET date = curdate()+ INTERVAL 6 day where date = "2023-05-26"');
}

module.exports = populateDB;
