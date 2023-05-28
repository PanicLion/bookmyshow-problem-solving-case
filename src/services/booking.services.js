const sequelize = require('../connections/mysql.connection').sequelize;
const getShowById = require('./show.services').getShowById;
const Booking = require('../models/booking.model');
const createShowSeats = require('./seat.services').createShowSeats;


/**
 * Gets all the details of show and seats selected by user for booking and 
 * creates the record in bookings and show_seats table as a transaction.
 * @param {*} showId show selected by uer.
 * @param {*} no_of_seats no. of seats selected by user.
 * @param {*} seats list of seats selected by user.
 * @returns show booked by user.
 */
async function createBooking(showId, no_of_seats, seats) {
    const t = await sequelize.transaction();
    try {
        // TODO: need to use LOCK for race conditions
        const show = await getShowById(showId, t);

        // First create a record in bookings table 
        const booking = await Booking.create({
            no_of_seats: no_of_seats,
            showId: showId
        }, { transaction: t });
        
        // Insert the booked seats in show_seats table
        await createShowSeats(seats, booking.id, show.dataValues.cinema_hall.id, showId, t);
        
        await t.commit();
        return show;
    } catch (err) {
        console.log(err);
        await t.rollback();
    }
}

module.exports = createBooking;
