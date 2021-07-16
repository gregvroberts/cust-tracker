// ################################################################
// FileName: ./src/models/index.mjs
// Size: 46
// Authors: Gregory Roberts
// Created On: 07/14/21
// Last Modified On: 07/14/21
// Copy Rights: HEB, LP.
// Description: the main entrypoint for models - handles mapping and such
// ################################################################

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const enVariables = require('../config/config.json');

// Recreate missing reference to __filename and __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const basename = path.basename(__filename);
const env = process.env.CUST_TRACKER_ENV || 'development';
const config = enVariables[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.mjs'))
    .forEach(file => {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  export default db;

