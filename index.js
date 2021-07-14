import express from 'express';
import route from './src/routes'
const winston = require('winston');

// Setup our logger with winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({ filename: 'logs/combined.log'}),
    ],
});

//
// If we're not in production, then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest })`
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console( {
        format: winston.format.simple(),
    }));
}

const app = express(); // Create our app

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);// Handle routes

// Set the port
const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
    logger.info(`App is running at port ${port}`);
});
