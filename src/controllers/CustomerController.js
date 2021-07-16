// ################################################################
// FileName: ./src/controllers/CustomerController.js
// Size: 91
// Authors: Gregory Roberts
// Created On: 07/14/21
// Last Modified On: 07/16/21
// Copy Rights: HEB, LP.
// Description: Controller for our customers table/class
// ################################################################

import model from '../models';
import logger from '../util/logger.js';

const { Customer } = model;

export default {
    // createCustomer Creates a new row in the customer_tracker.Customers table.
    async createCustomer(request, response) {
        const {first_name, last_name, email, address, city, state, zip} = request.body;
        try {
            await Customer.create({
                first_name,
                last_name,
                email,
                address,
                city,
                state,
                zip,
            }).then(newCustomer => response.status(201).json(newCustomer)).catch(console.error);
        } catch (e) {
            console.log(e);
            return response.status(500) // internal server error
                .send(
                    {message: 'Could not perform operation at this time, kindly try again later.'});
        }
    },
    async getCustomers(request, response) {
        let customers; // Array of customers fetched from cust-tracker.customers table
        // COMPLETED TD - 07-16-2021 Had 2 try-catch statements. Refactored to just one.
        try {
            // If city variable is defined in the URL, query by city string
            if (typeof request.query.city !== 'undefined' && request.query.city) {
                // Get the city string from the request variable
                const custCity = request.query.city
                customers = await Customer.findAll({where: { city: custCity}});
                if (customers) {
                    return response.status(200).json(customers);
                } // endif
            } else {
                // Get all the customers in the DB if the city string wasn't specified
                customers = await Customer.findAll();
                if (customers) {
                    return response.status(200).json(customers);
                } // endif
            }
        } catch(e) {
            logger.error(e);
            return response.status(500) // internal server error
                .send(
                    {message: 'Could not perform operation at this time, kindly try again later.'});
        }
    },
    async getCustomersByID(request, response) {
        const custID = parseInt(request.params.id); // grab the param value provided by client
        try {
            // Fetch the customer(s) row
            let customers = await Customer.findAll({where: { id: custID}});
            if (customers) {
                return response.status(200).json(customers); // return the customer(s)
            }
        } catch (e) {
            console.log(e);
            return response.status(500) // internal server error
                .send(
                    {message: 'Could not perform operation at this time, kindly try again later.'});
        }
    }
}