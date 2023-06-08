const env = process.env;

const REDIS_URI = {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
}


module.exports = REDIS_URI;
