const redis = require('redis');
const REDIS_URL = require('../configs/redis.config');
const redisUrl = process.env.REDIS_URL;


let redisClient;

(async () => {
    // redisClient = redis.createClient(REDIS_URI.REDIS_HOST, REDIS_URI.REDIS_PORT);
    redisClient = redis.createClient({
        url: REDIS_URL
    })
    redisClient.on("error", (error) => {
        console.log(`Error ${error}`);
    });
    await redisClient.connect();
})();

module.exports = redisClient;
