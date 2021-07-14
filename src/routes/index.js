import CustomerController from '../controllers/CustomerController'

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../../swagger.json');


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
        message: 'Hello, ES Team!',
    }));
};