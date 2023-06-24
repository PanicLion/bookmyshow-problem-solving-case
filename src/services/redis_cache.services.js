const redisClient = require('../connections/redis.connection');


async function getByKey(key) {
    return await redisClient.get(key);
}


async function setByKeyValue(key, value) {
    await redisClient.set(key, value);
}


async function setExpiryByKey(key, expiry) {
    await redisClient.expire(key, expiry);
}

module.exports = { getByKey, setByKeyValue, setExpiryByKey };
