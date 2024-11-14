const app = require('express')();
const port = process.env.NODE_API_PORT;

// Middleware
const requestDuration = require('./middlewares/request-duration');

// Here is where you add the routes which need to be monitored
app.use(requestDuration(['/sweet-as-bro']));

// Routes
const sweetRoute = require('./routes/sweet-route');
const metricsRoute = require('./routes/metrics-route');
app.use(sweetRoute);
app.use(metricsRoute);

// Server start
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})