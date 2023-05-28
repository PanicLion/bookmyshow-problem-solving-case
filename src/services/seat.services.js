const sequelize = require('../connections/mysql.connection').sequelize;
const { QueryTypes } = require('sequelize');
const CinemaSeat = require('../models/seat.model').CinemaSeat;
const { Op } = require('sequelize');
const ShowSeat = require('../models/seat.model').ShowSeat;


/**
 * gets the cinema_seats id(s) of the seat(s) provided by user
 * @param seats A list of seat_no selected by user for booking 
 * @param cinemaHallId cinema_hall id for the show
 * @param t transaction object
 * @returns the properties of the seats selected by user
 */
async function getCinemaSeatsId(seats, cinemaHallId, t) {
    try {
        let orConditionForSeats = [];
        for (let seat of seats) {
            orConditionForSeats.push(
                {
                    row: seat.charAt(0), 
                    seat_no: seat.charAt(1)
                }
            )
        }

        const cinemaSeats = await CinemaSeat.findAll({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: orConditionForSeats
                    },
                    {
                        cinemaHallId: cinemaHallId
                    }
                ]
            },
            attributes: [
                'id',
                'row',
                'seat_no',
                'type'
            ],
            transaction: t
        });
        return cinemaSeats;
    } catch (err) {
        console.log(err);
        throw new Error();
    }   
}


/**
 * Inserts the seats booked by user in show_seats tabl, so that booked seats can be identified.
 * @param {*} seats list of seats selected by user.
 * @param {*} bookingId bookingId from bookings table to identify all the seats booked by a user.
 * @param {*} cinemaHallId cinemaHallId to identify the cinema hall.
 * @param {*} showId show id from shows table.
 * @param {*} t transaction object.
 */
async function createShowSeats(seats, bookingId, cinemaHallId, showId, t) {
    try {
        // Get cinema seat id from cinema_seats table
        const cinemaSeats = await getCinemaSeatsId(seats, cinemaHallId, t);

        // Then insert all the seats booked in show_seats table
        let showSeats = [];
        for (let cinemaSeat of cinemaSeats) {
            showSeats.push({
                seat_no: cinemaSeat.dataValues.row + cinemaSeat.dataValues.seat_no,
                cinemaSeatId: cinemaSeat.dataValues.id,
                bookingId: bookingId,
                showId: showId
            })
        }
        await ShowSeat.bulkCreate(showSeats, { transaction: t });
    } catch (err) {
        console.log(err);
        throw new Error();
    }
}


async function getAvailableSeats(showId, cinemaHallId) {
    let query = "SELECT cinema_seats.row, concat(cinema_seats.row, cinema_seats.seat_no) as available_seats \
                FROM cinema_seats \
                WHERE NOT EXISTS ( \
                    SELECT 1 \
                    FROM show_seats \
                    WHERE cinema_seats.id = show_seats.cinemaSeatId \
                        AND show_seats.showId = :showId \
                ) \
                    AND cinemaHallId = :cinemaHallId";
    
                    const seats = await sequelize.query(query, {
        replacements: {
            showId: showId,
            cinemaHallId: cinemaHallId
        },
        type: QueryTypes.SELECT
    });
    return seats;
}

module.exports = { getCinemaSeatsId, createShowSeats, getAvailableSeats };
