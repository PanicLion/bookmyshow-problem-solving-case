const ESClient = require('../connections/es.connection').ESClient;


async function createIndex(indexName, schema) {
    try {
        if (await ESClient.indices.exists({ index: indexName })) {
            console.log(` Deleting index ${indexName} because it's already exists ...`);
            await ESClient.indices.delete({ index: indexName });
        }
        await ESClient.indices.create({
            index: indexName
        });
        console.log(`Created Index ${indexName}`);

        await setMapping(indexName, schema);
    } catch (err) {
        console.log(`An error occurred while creating an index ${indexName}`);
        console.error(err);
    }
}


async function setMapping(indexName, schema) {
    try {
        await ESClient.indices.putMapping({
            index: indexName,
            body: {
                properties: schema
            }
        });
        console.log("Mapping created successfully for ", indexName);
    } catch (err) {
        console.log(`An error occurred while mapping an index ${indexName}`);
        console.error(err);
    }
}


async function populateIndex(documents, indexName) {
    try {
        const bulkRequests = [];

        for(doc of documents) {
            const indexRequest = {
                index: {
                    _index: indexName
                }
            };
            bulkRequests.push(indexRequest);
            bulkRequests.push(doc);
        }

        const bulkResponse = await ESClient.bulk({
            refresh: true,
            body: bulkRequests
        });

        if (bulkResponse.errors) {
            const errorDocuments = [];

            bulkResponse.items.forEach((action, i) => {
                const operation = Object.keys(action)[0];
                if (action[operation].error) {
                    errorDocuments.push({
                        status: action[operation].status,
                        error: action[operation].error,
                        data: bulkRequests[i]
                    });
                }
            });
            console.error("Error indexing documents ", errorDocuments);
        }

    } catch (err) {
        console.log(err);
    }
}


async function search(req) {
    try {
        const result = await ESClient.msearch({
            searches: [
                { 
                    index: 'movies',
                },
                {
                    query: {
                        match: {
                            title: {
                                query: req.query.text,
                                operator: 'AND',
                                fuzziness: 'auto'
                            }
                        }
                    },
                    _source: [
                        'title',
                        'description',
                        'duration',
                        'language',
                        'genere',
                        'release_date'
                    ]
                },
                {
                    index: 'cinemas'
                },
                {
                    query: {
                        match: {
                            name: {
                                query: req.query.text,
                                operator: 'AND',
                                fuzziness: 'auto'                                
                            }
                        }
                    }
                }
            ]
        });
        return result.responses;
    } catch (err) {
        console.log(err);
    }
}


async function filterMovies(req) {
    try {
        // TODO: Keep these two in constant file
        let language = ['english', 'hindi', 'tamil', 'telugu', 'kannada', 'malayalam'];
        let genere = ['action', 'comedy', 'horror', 'thriller', 'romantic', 'drama', 'historical', 'adventure'];
        
        if (req.query.language) {
            language = req.query.language.split('|');
        }
        if (req.query.genere) {
            genere = req.query.genere.split('|');
        }

        const movies = await ESClient.search({
            from: req.query.from || 0,
            size: req.query.size || 10,
            body: {
                query: {
                    bool: {
                        filter: [
                            {
                                terms: {
                                    genere: genere
                                }
                            },
                            {
                                terms: {
                                    language: language
                                }
                            }
                        ]
                    }
                }
            }
        });
        return movies;
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    createIndex,
    setMapping,
    populateIndex,
    search,
    filterMovies
};
