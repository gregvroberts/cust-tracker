// ################################################################
// FileName: ./src/models/Customer.js
// Size: 50
// Authors: Gregory Roberts
// Created On: 07/14/21
// Last Modified On: 07/14/21
// Copy Rights: HEB, LP.
// Description: The Customer model definition file
// ################################################################

// This code has been ported from original defaults, to use es6 by Gregory Roberts
import { Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = [];

export default (sequelize, DataTypes) => {
    class Customer extends Model {
        // FOR FUTURE PROTECTED ATTRIBUTES
        toJSON() {
            // hide protected fields. Not used now but available for future if this challenge were expanded
            const attributes = { ...this.get() };
            // eslint-disable-next-line no-restricted-syntax
            for (const a of PROTECTED_ATTRIBUTES) {
                delete attributes[a];
            }
            return attributes;
        }

        /**
         * Helper method for defining associations.
         * This method is not part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically
         */
        static associate(models) {
            // define associations here
        }
    }
    Customer.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
};
