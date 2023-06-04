const { search } = require('../services/es.services');


const searchResults = async (req, res) => {
    try {
        let results = [];
        const responses = await search(req);
        for (const response of responses) {
            if (response.hits.total.value === 0) continue;
        
            const values = response.hits.hits.map((hit) => {
                const indexName = hit._index;
                if (indexName == 'movies') {
                    results.push({
                        index: indexName,
                        title: hit._source.title,
                        description: hit._source.description,
                        duration: hit._source.duration,
                        genere: hit._source.genere,
                        release_date: hit._source.release_date,
                        language: hit._source.language
                    });
                } else if (indexName == 'cinemas') {
                    results.push({
                        index: indexName,
                        name: hit._source.name
                    });
                }
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                message: 'No results found'
            });
        }
        return res.status(200).send({results});
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err
        });
    }
};


module.exports = searchResults;
