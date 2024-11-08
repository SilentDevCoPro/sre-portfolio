const express = require('express');
const promClient = require('prom-client');
const router = express.Router();

router.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', promClient.register.contentType);
        res.end(await promClient.register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

module.exports = router;
