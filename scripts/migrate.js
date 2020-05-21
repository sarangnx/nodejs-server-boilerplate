const Sequelize = require('sequelize');
const Umzug = require('umzug');
const path = require('path');
const logger = require('../src/modules/utils/winston');

// Initialize config
require('../config');

// Create a connection to mysql.
const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // .bind fix from https://github.com/winstonjs/winston/issues/1062
    logging: process.env.DB_LOGGING === 'true' ? logger.debug.bind(logger) : false,
});

// create an umzug object for migrations.
const migrations = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize,
    },
    migrations: {
        params: [sequelize.getQueryInterface(), sequelize.constructor],
        path: path.resolve(process.env.MIGRATIONS),
        pattern: /\.js$/,
    },
    logging: process.env.DB_LOGGING === 'true' ? logger.debug.bind(logger) : false,
});

// create an umzug object for seeders.
const seeders = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize,
        modelName: 'SequelizeSeeders',
    },
    migrations: {
        params: [sequelize.getQueryInterface(), sequelize.constructor],
        path: path.resolve(process.env.SEEDERS),
        pattern: /\.js$/,
    },
    logging: process.env.DB_LOGGING === 'true' ? logger.debug.bind(logger) : false,
});

module.exports = {
    // Create DB
    async createDB() {
        await sequelize.getQueryInterface().createDatabase(process.env.DB_NAME);
    },

    // Drop database
    async dropDB() {
        await sequelize.getQueryInterface().dropDatabase(process.env.DB_NAME);
    },

    // Do migrations
    async migrate({ from, to, all }) {
        await this.createDB();
        await sequelize.query(`use ${process.env.DB_NAME}`);

        if (from && all) {
            await migrations.up({ from, to });
        } else {
            await migrations.up(from);
        }
    },

    // Undo single migration
    async migrateUndo({ to, all }) {
        await sequelize.query(`use ${process.env.DB_NAME}`);

        if (to && all) {
            // Undo all migrations till specified one
            await migrations.down({ to });
        } else if (!to && all) {
            // Undo all migrations
            await migrations.down({ to: 0 });
        } else {
            // undo single migration
            await migrations.down(to);
        }
    },

    // Fill table with seeds
    async seed({ from, to, all }) {
        await sequelize.query(`use ${process.env.DB_NAME}`);

        if (from && all) {
            await seeders.up({ from, to });
        } else {
            await seeders.up(from);
        }
    },

    // Undo single seed
    async seedUndo({ to, all }) {
        await sequelize.query(`use ${process.env.DB_NAME}`);

        if (to && all) {
            // Undo all seeds till the specified one
            await seeders.down({ to });
        } else if (!to && all) {
            // Undo all seeds
            await seeders.down({ to: 0 });
        } else {
            // Undo single seed
            await seeders.down(to);
        }
    },

    // close db connections
    async close() {
        await sequelize.close();
    },
};
