const env = process.env;


const ES_CONFIG = {
    node: env.ES_URL || 'http://localhost:9200',
    auth: {
        username: env.ES_USERNAME,
        password: env.ES_PASSWORD
    }
}


module.exports = ES_CONFIG;
