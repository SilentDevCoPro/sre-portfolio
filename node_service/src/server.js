const app = require('express')();
const port = process.env.NODE_API_PORT;

const requestDuration = require('./middlewares/request-duration');

app.use(requestDuration(['/sweet-as-bro']));

const sweetRoute = require('./routes/sweet-route');
const metricsRoute = require('./routes/metrics-route');
app.use(sweetRoute);
app.use(metricsRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})