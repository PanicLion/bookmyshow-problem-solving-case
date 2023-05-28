// const { Op } = require('sequelize');
const Show = require('../models/show.model');
const { Cinema, CinemaHall } = require('../models/cinema.model');
const Movie = require('../models/movie.model');
const City = require('../models/city.model');


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
            // where: {
            //     date: date,
            //     start_time: {
            //         [Op.gt]: new Date().toLocaleTimeString('it-IT')
            //     }
            // },
            attributes: [
                'id',
                'start_time',
                'end_time',
            ]
        });
        return shows;
    } catch (err) {
        console.log(err);
    }
}


async function getShowById(showId, t) {
    try {
        const show = Show.findOne({
            include: [
                {
                    model: CinemaHall,
                    attributes: [
                        'id',
                        'name'
                    ],
                    include: [
                        {
                            model: Cinema,
                            attributes: [
                                'name'
                            ],
                            include: [
                                {
                                    model: City,
                                    attributes: [
                                        'name'
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Movie,
                    attributes: [
                        'id',
                        'title', 
                        'description', 
                        'duration'
                    ]
                }
                
            ],
            where: {
                id: showId
            },
            attributes: [
                'id',
                'date',
                'start_time',
            ],
            transaction: t
        });
        return show;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
}

module.exports = { getShowsByCinemaId, getShowById };
