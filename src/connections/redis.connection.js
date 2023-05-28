const redis = require('redis');
const REDIS_URI = require('../configs/redis.config');


let redisClient;

(async () => {
    redisClient = redis.createClient(REDIS_URI.REDIS_HOST, REDIS_URI.REDIS_PORT);
    redisClient.on("error", (error) => {
        console.log(`Error ${error}`);
    });
    await redisClient.connect();
})();

module.exports = redisClient;
