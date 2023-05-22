
function applyExtraSetup () {
    const City = require('./models/city.model');
    const Movie = require('./models/movie.model');
    const { Cinema, CinemaHall } = require('./models/cinema.model');
    const Show = require('./models/show.model');

    City.hasMany(Cinema);
    Cinema.belongsTo(City);

    Cinema.hasMany(CinemaHall);
    CinemaHall.belongsTo(Cinema);
    
    CinemaHall.hasMany(Show);
    Show.belongsTo(CinemaHall);

    Movie.hasMany(Show);
    Show.belongsTo(Movie);
}

module.exports = applyExtraSetup;
