const { Op } = require('sequelize');
const Show = require('../models/show.model');
const CinemaHall = require('../models/cinema.model').CinemaHall;
const Movie = require('../models/movie.model');


async function getShowsByCinemaId(cinemaId, date) {
    try{
        const shows = await Show.findAll({
            include: [
                {
                    model: CinemaHall,
                    attributes: [],
                    where: {
                        cinemaId: cinemaId
                    }
                },
                {
                    model: Movie,
                    attributes: [
                        'title', 
                        'description', 
                        'duration'
                    ]
                }
            ],
            where: {
                date: date,
                start_time: {
                    [Op.gt]: new Date().toLocaleTimeString('it-IT')
                }
            },
            attributes: [
                'start_time',
                'end_time',
            ]
        });
        return shows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = getShowsByCinemaId;
