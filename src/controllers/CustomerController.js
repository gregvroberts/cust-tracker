import model from '../models';

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

        // If city variable is defined in the URL, query by city string
        if (typeof request.query.city !== 'undefined' && request.query.city) {
            // Get the city string from the request variable
            const custCity = request.query.city
            try {
                let customers = await Customer.findAll({where: { city: custCity}});
                // If we have a ORM/DB return....
                if (customers) {
                    return response.status(200).json(customers);
                } // endif
            } catch (e) {
                console.log(e);
                return response.status(500) // internal server error
                    .send(
                        {message: 'Could not perform operation at this time, kindly try again later.'});
            } // endcatch
        } else { // Otherwise, just get all customers without city specified
            try {
                // Get all the customers in the DB if the city string wasn't specified
                let customers = await Customer.findAll();
                if (customers) {
                    return response.status(200).json(customers);
                } else {
                    return response.status(200).send({message: 'No customers found'});
                }
            } catch (e) {
                console.log(e);
                return response.status(500) // internal server error
                    .send(
                        {message: 'Could not perform operation at this time, kindly try again later.'});
            } // endcatch
        } // endelse

    },

    async getCustomersByID(request, response) {

        const custID = parseInt(request.params.id);

        try {
            let customers = await Customer.findAll({where: { id: custID}});
            if (customers) {
                return response.status(200).json(customers);
            }
        } catch (e) {
            console.log(e);
            return response.status(500) // internal server error
                .send(
                    {message: 'Could not perform operation at this time, kindly try again later.'});
        }
    }

}