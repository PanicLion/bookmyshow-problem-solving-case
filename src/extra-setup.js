
function applyExtraSetup () {
    const City = require('./models/city.model');
    const Movie = require('./models/movie.model');
    const { Cinema, CinemaHall } = require('./models/cinema.model');
    const Show = require('./models/show.model');

    Movie.hasMany(Show);
    Show.belongsTo(CinemaHall);
    Show.belongsTo(Movie);
    CinemaHall.hasMany(Show);
    City.hasMany(Cinema);
    Cinema.belongsTo(City);
    Cinema.hasMany(CinemaHall);
    CinemaHall.belongsTo(Cinema);
}

module.exports = applyExtraSetup;
