// ################################################################
// FileName: ./index.mjs
// Size: 52
// Authors: Gregory Roberts
// Created On: 07/13/21
// Last Modified On: 07/14/21
// Copy Rights: HEB, LP.
// Description: The main entrypoint for our application
// ################################################################

import express from 'express';
import route from './src/routes/index.mjs'
import logger from './src/util/logger.mjs';
import dotenv from 'dotenv';

dotenv.config() // initialize our dotenv package to sync .env variables


const app = express(); // Create our app

app.use(express.urlencoded({ extended: true })); // helps keep from injections. Security measure
app.use(express.json()); // Provides json support

route(app);// Handle routes

// Set the port
const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
    logger.info(`App is running at port ${port}`);
});
