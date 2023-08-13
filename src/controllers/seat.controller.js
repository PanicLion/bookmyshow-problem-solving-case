const getShowById = require('../services/show.services').getShowById;
const getAvailableSeats = require('../services/seat.services').getAvailableSeats;


const availableSeats = async (req, res) => {
    try {
        const showId = req.params['showId'];
        const show = await getShowById(showId, null);
        const cinemaHallId = show.dataValues.cinema_hall.id;

        const seats = await getAvailableSeats(showId, cinemaHallId);
        
        let seatLayout = {};
        for (const seat of seats) {
            if (seat.row in seatLayout) {
                seatLayout[seat.row].push(seat.available_seats);
            } else {
                seatLayout[seat.row] = [seat.available_seats];
            }
        }

        for (const row in seatLayout) {
            seatLayout[row] = seatLayout[row].join(' | ');
        }
        return res.status(200).send({
            "-----------------------------------------------------": "All eyes this side -----------------------------------------------------",
            seats: seatLayout
        });

    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
}

module.exports = availableSeats;
