const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('../modules/utils/winston');

// Object to hold the imported models.
const db = {};

// Create a connection to mysql.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // process.env stores booleans as strings not booleans
    logging: process.env.DB_LOGGING === 'false' ? false : logger.debug.bind(logger),
});

/**
 * Get filenames of models that are in the models folder.
 * return filenames,
 * which do not start with ".",
 * which is not index.js,
 * which ends with ".js".
 */
const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js');

// Import the models files
for (const file of files) {
    // import the file.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    // Initialize the model.
    db[model.name] = model;
}

// Create associations & add other configurations.
Object.keys(db).forEach((modelName) => {
    // add associations
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
    // configure
    if (db[modelName].configure) {
        db[modelName].configure(db);
    }
});

// connection object and Sequelize object
module.exports = {
    sequelize,
    Sequelize,
    ...db,
};
