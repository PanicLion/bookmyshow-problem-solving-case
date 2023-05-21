const sequelize = require('../connections/mysql.connection').sequelize;
const { QueryTypes } = require('sequelize');
const Show = require('../models/show.model');
const CinemaHall = require('../models/cinema.model').CinemaHall;
const Movie = require('../models/movie.model');


async function getShowsByCinemaId(cinemaId, date) {
    try{
        // const shows = await Show.findAll({
        //     include: [
        //         {
        //             model: CinemaHall,
        //             where: {
        //                 cinemaId: cinemaId
        //             }
        //         },
        //         {
        //             model: Movie
        //         }
        //     ]
        // });
        const shows = await sequelize.query(
            "SELECT movies.title, \
            movies.description, \
            movies.duration, \
            shows.start_time, \
            shows.end_time \
            FROM cinemas \
            JOIN cinema_halls \
                ON cinemas.id = cinema_halls.cinemaId \
            JOIN shows \
                ON cinema_halls.id = shows.cinemaHallId \
            JOIN movies \
                ON movies.id = shows.movieId \
            WHERE shows.date = :date \
                and cinemas.id = :cinema_id",
            {
                replacements: { cinema_id: cinemaId, date: date },
                type: QueryTypes.SELECT
            }
        );
        return shows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = getShowsByCinemaId;
