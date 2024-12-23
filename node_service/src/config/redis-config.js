const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD,
});

client.on('connect', () => {
    global.console.log("connected");
});

client.on('error', err => {
    global.console.log(err.message)
});

(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
})();

module.exports = client;