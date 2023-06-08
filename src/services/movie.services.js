const Movie = require('../models/movie.model');

async function getMovieById(id) {
    try {
        const movie = await Movie.findOne({
            attributes: [
                'title',
                'description',
                'duration',
                'genere',
                'release_date'
            ],
            where: {
                id: id
            }
        });
        return movie;
    } catch (err) {
        console.log(err);
    }
}

module.exports = getMovieById;
