// ################################################################
// FileName: ./src/routes/index.mjs
// Size: 34
// Authors: Gregory Roberts
// Created On: 07/14/21
// Last Modified On: 07/16/21
// Copy Rights: HEB, LP.
// Description: This is where our routes are defined
// ################################################################

import CustomerController from '../controllers/CustomerController.mjs'

// import swagger stuff
//todo switch this to import
import swaggerUi from 'swagger-ui-express';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require('../../swagger.json');

export default (app) => {
    // Gets all customers. If ?city=... is included in the path, then it query for matching city string only
    app.get('/customers', CustomerController.getCustomers);
    // Gets all customers by ID
    app.get('/customers/:id', CustomerController.getCustomersByID);
    // Creates a new customer
    app.post('/customers', CustomerController.createCustomer);

    // our swagger api docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Our catch-all route for testing the installation.
    app.all('*', (request, response) => response.status(200).send({
        message: 'Hello, Interview Panel!',
    }));
};