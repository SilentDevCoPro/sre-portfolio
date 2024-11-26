const httpRequestDurationSeconds = require('../metrics/histogram');

module.exports = (monitoredRoutes = []) => (req, res, next) => {

    if (monitoredRoutes.includes(req.path)) {
        const startHrTime = process.hrtime();
        res.on('finish', () => {
            const elapsedHrTime = process.hrtime(startHrTime);
            const elapsedSeconds = elapsedHrTime[0] + elapsedHrTime[1] / 1e9;
            httpRequestDurationSeconds
                .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
                .observe(elapsedSeconds);
        });
    }
    next();
};
