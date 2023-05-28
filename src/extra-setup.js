const City = require('./models/city.model');
const Movie = require('./models/movie.model');
const { Cinema, CinemaHall } = require('./models/cinema.model');
const Show = require('./models/show.model');
const { CinemaSeat, ShowSeat } = require('./models/seat.model');
const Booking = require('./models/booking.model');


function applyExtraSetup () {
    City.hasMany(Cinema);
    Cinema.belongsTo(City);

    Cinema.hasMany(CinemaHall);
    CinemaHall.belongsTo(Cinema);
    
    CinemaHall.hasMany(Show);
    Show.belongsTo(CinemaHall);

    Movie.hasMany(Show);
    Show.belongsTo(Movie);

    CinemaHall.hasMany(CinemaSeat);
    CinemaSeat.belongsTo(CinemaHall);

    CinemaSeat.hasMany(ShowSeat);
    ShowSeat.belongsTo(CinemaSeat);

    Show.hasMany(Booking);
    Booking.belongsTo(Show);

    Booking.hasMany(ShowSeat);
    ShowSeat.belongsTo(Booking);

    Show.hasMany(ShowSeat);
    ShowSeat.belongsTo(Show);
}

module.exports = applyExtraSetup;
