const httpRequestDurationSeconds = require('../metrics/histogram');

module.exports = (monitoredRoutes = []) => (req, res, next) => {

    // Check if the request path is one of the monitored routes
    if (monitoredRoutes.includes(req.path)) {

        // Gets start time in High Resolution time
        const startHrTime = process.hrtime();

        // Listens to the finish event and calculates the duration from the elapsed time
        res.on('finish', () => {
            // Compares start time to current time to get elapsed time
            const elapsedHrTime = process.hrtime(startHrTime);

            // Calculates the extra seconds from the leftover nanoseconds and adds them to seconds
            const elapsedSeconds = elapsedHrTime[0] + elapsedHrTime[1] / 1e9;

            // Records the duration in seconds
            httpRequestDurationSeconds
                .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
                .observe(elapsedSeconds);
        });
    }

    next();
};
