const yargs = require('yargs');
const migrate = require('./migrate.js');
const logger = require('../src/modules/utils/winston');

// Migrate
yargs.command({
    command: 'migrate [from] [to]',
    usage: '$0 migrate [from] [to]',
    describe: 'Migrate Database.',
    async handler(args) {
        logger.info('Running migrations 🏃‍');

        const { undo, all, from, to } = args;

        if (undo) {
            await migrate.migrateUndo({ to: to || from, all });
        } else {
            await migrate.migrate({ from, to, all });
        }

        await migrate.close();
        logger.info('complete ✔️');
    },
});

// Seed
yargs.command({
    command: 'seed [from] [to]',
    usage: '$0 seed [from] [to]',
    describe: 'Seed Database.',
    async handler(args) {
        logger.info('Running seeds 🏃‍');

        const { undo, all, from, to } = args;

        if (undo) {
            await migrate.seedUndo({ to: to || from, all });
        } else {
            await migrate.seed({ from, to, all });
        }

        await migrate.close();
        logger.info('complete ✔️');
    },
});

// Error handling
yargs.fail(function (msg, err, yargs) {
    if (err) {
        logger.error(err);
    } else {
        if (msg) {
            console.log(msg);
        }
        console.log(yargs.help());
    }
    process.exit(1);
});

yargs.options('undo', {
    alias: 'u',
    describe: 'Undo migration or seed',
    type: 'boolean',
});

yargs.options('all', {
    alias: 'a',
    describe: 'Select all',
    type: 'boolean',
});

yargs.demandCommand(1, 'You must choose a command').argv;
