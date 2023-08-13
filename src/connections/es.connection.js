const { Client } = require('@elastic/elasticsearch');
const ES_CONFIG = require('../configs/es.config');


const ESClient = new Client(ES_CONFIG);

const connectToES = async () => {
    try {
        const health = await ESClient.cluster.health();
        console.log('Elasticsearch cluster health: ', health);
    } catch (error) {
        console.log('Error checking cluster health: ', error);
    }
};

module.exports = { ESClient, connectToES };
