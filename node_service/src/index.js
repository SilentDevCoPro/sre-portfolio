const app = require('express')();
const port = 80;
const promClient = require('prom-client');

//Creates histogram metric, histogram selected as they are excellent for response durations
const httpRequestDurationSeconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.0005, 0.005, 0.01, 0.025, 0.05, 0.1, 0.5, 1, 5]
});

//Middleware to measure request duration of an Express transaction
app.use((req, res, next) => {

    //Gets start time in High Resolution time
    const startHrTime = process.hrtime();

    //Listens to the finish event and calculates the duration form the elapsed time
    res.on('finish', () => {

        //Compares start time to current time getting elapsed time
        const elapsedHrTime = process.hrtime(startHrTime);

        //Calculates the extra seconds from the leftover nanoseconds and adds them to seconds
        const elapsedSeconds = elapsedHrTime[0] + elapsedHrTime[1] / 1e9;

        //Records the duration in seconds
        httpRequestDurationSeconds
            .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
            .observe(elapsedSeconds);
    });

    next();
});

//Endpoint for the user to enjoy
app.get('/sweet-as-bro', (req, res) => {
    res.status(200).send({
        'sweet-as-bro': 'He is definitely kiwi',
        'location': 'Land of the sheep and middle earth'
    })
})

//Endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', promClient.register.contentType);
        res.end(await promClient.register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

//Server start
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})