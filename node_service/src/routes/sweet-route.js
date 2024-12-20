const express = require('express');
const client = require('../config/redis-config'); // Import Redis client
const router = express.Router();

router.get('/sweet-as-bro', async (req, res) => {
    try {
        let redisValue = await client.get('special-key');

        if (redisValue) {
            res.status(200).send({
                'sweet-as-bro': 'He is definitely kiwi',
                'location': 'Land of the sheep and middle earth',
                'cacheStatus': 'HIT'
            });
        } else {
            const kiwiData = {
                'sweet-as-bro': 'He is definitely kiwi',
                'location': 'Land of the sheep and middle earth'
            };
            await client.set('special-key', JSON.stringify(kiwiData), {
                EX: 5
            });
            res.status(200).send({
                ...kiwiData,
                'cacheStatus': 'MISS'
            });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error accessing Redis' });
    }
});

module.exports = router;
