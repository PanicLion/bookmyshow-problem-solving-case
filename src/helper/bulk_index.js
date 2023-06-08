const { createIndex, populateIndex } = require('../services/es.services');
const { movieData, cinemaData } = require('./dummy_data');


const modelsToBuildIndexFor = [
    {
        indexName: 'movies',
        // type: 'movies',
        schema: {
            title: {
                type: 'text'
            },
            description: {
                type: 'text'
            },
            duration: {
                type: 'text'
            },
            country: {
                type: 'text'
            },
            genere: {
                type: 'text'
            },
            release_date: {
                type: 'text'
            },
            language: {
                type: 'text'
            }
        },
        documents: movieData
    },
    {
        indexName: 'cinemas',
        // type: 'cinemas',
        schema: {
            name: {
                type: 'text'
            },
            cityId: {
                type: 'integer'
            }
        },
        documents: cinemaData
    }
];


/**
 * Creates index for the models in modelsToBuildIndexFor list and populates with the dummy data.
 */
async function buildIndex() {
    try {
        for (model of modelsToBuildIndexFor) {
            await createIndex(model.indexName,  model.schema);
            // await setMapping(model.indexName, model.type, model.schema);
            await populateIndex(model.documents, model.indexName);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = buildIndex;
