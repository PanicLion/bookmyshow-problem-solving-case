const { filterMovies } = require('../services/es.services');
const { getByKey, setByKeyValue, setExpiryByKey } = require('../services/redis_cache.services');
const getMovieById = require('../services/movie.services');


const movies = async (req, res) => {
    try {
        const movies = [];
        const response = await filterMovies(req);
        const results = response.hits.hits;
        results.map((result) => {
            movies.push(result._source);
        });
        return res.status(200).send({movies});
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: err
        });
    }
};


const getMovieData = async (req, res) => {
    try {
        const id = req.params['id'];
        const key = 'movie_' + id;

        const cacheResult = await getByKey(key);
        if (cacheResult) {
            console.log('Getting result from cache...');
            return res.status(200).send(JSON.parse(cacheResult));
        }

        console.log('Getting result from db...');
        const movie = await getMovieById(id);

        if (movie === null) {
            return res.status(404).send({
                message: 'Movie does not exists!'
            });
        }
        await setByKeyValue(key, JSON.stringify(movie));
        await setExpiryByKey(key, process.env.MOVIE_DATA_EXPIRY);

        return res.status(200).send(movie);

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err
        });
    }
};

module.exports = { movies, getMovieData };
