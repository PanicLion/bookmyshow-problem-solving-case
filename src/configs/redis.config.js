const env = process.env;

// const REDIS_URI = {
//     host: env.REDIS_HOST,
//     port: env.REDIS_PORT
// }

const host = env.REDIS_HOST;
const port = env.REDIS_PORT;

const REDIS_URL = `redis://${host}:${port}`;


// module.exports = REDIS_URI;
module.exports = REDIS_URL;
