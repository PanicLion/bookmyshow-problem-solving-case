const { filterMovies } = require('../services/es.services');


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

module.exports = movies;
