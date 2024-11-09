const express = require('express');
const client = require('../config/redis-config'); // Import Redis client
const router = express.Router();

router.get('/sweet-as-bro', async (req, res) => {
    try {
        // Try to retrieve a value from Redis
        let redisValue = await client.get('special-key');

        if (redisValue) {
            // If Redis hit, send the "kiwi" response with cache status "HIT"
            res.status(200).send({
                'sweet-as-bro': 'He is definitely kiwi',
                'location': 'Land of the sheep and middle earth',
                'cacheStatus': 'HIT'
            });
        } else {
            // If cache miss, set data in Redis
            const kiwiData = {
                'sweet-as-bro': 'He is definitely kiwi',
                'location': 'Land of the sheep and middle earth'
            };

            // Store data in Redis with a key, TTL 5 for demo
            await client.set('special-key', JSON.stringify(kiwiData), {
                EX: 5
            });

            // Send the "kiwi" response with cache status "MISS"
            res.status(200).send({
                ...kiwiData,
                'cacheStatus': 'MISS'
            });
        }
    } catch (error) {
        // Handle any Redis or server errors
        res.status(500).send({ error: 'Error accessing Redis' });
    }
});

module.exports = router;
