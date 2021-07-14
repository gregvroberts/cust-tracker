// ################################################################
// FileName: ./index.js
// Size: 52
// Authors: Gregory Roberts
// Created On: 07/13/21
// Last Modified On: 07/14/21
// Copy Rights: HEB, LP.
// Description: The main entrypoint for our application
// ################################################################

import express from 'express';
import route from './src/routes'
import logger from './src/util/logger';
//
// // Setup our logger with winston
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//         //
//         // - Write all logs with level `error` and below to `error.log`
//         // - Write all logs with level `info` and below to `combined.log`
//         //
//         new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
//         new winston.transports.File({ filename: 'logs/combined.log'}),
//     ],
// });

const app = express(); // Create our app

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);// Handle routes

// Set the port
const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
    logger.info(`App is running at port ${port}`);
});
