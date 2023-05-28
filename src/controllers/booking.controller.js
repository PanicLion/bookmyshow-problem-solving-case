const createBooking = require('../services/booking.services');


const tickets = async (req, res) => {
    try {
        const showId = req.params['showId'];
        const date = req.params['date'];
        const noOfSeats = parseInt(req.body.no_of_seats);
        const seats = req.body.seats;
        
        // TODO: Check if no_of_seats is equal to length of seats
        if (noOfSeats !== seats.length) {
            return res.status(400).send({
                message: "Please select valid no. of seats."
            });
        }
        let show = await createBooking(showId, noOfSeats, seats);
        return res.status(200).send({
            date: date,
            city: show.dataValues.cinema_hall.cinema.city.name,
            cinema: show.dataValues.cinema_hall.cinema.name,
            movie: show.dataValues.movie.title,
            duration: show.dataValues.movie.duration,
            start_time: show.dataValues.start_time,
            cinema_hall: show.dataValues.cinema_hall.name,
            seats: seats
        });
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
};

module.exports = tickets;
