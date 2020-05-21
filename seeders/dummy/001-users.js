const Utils = require('../../src/modules/utils/utils');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    userId: 1,
                    email: 'user@gmail.com',
                    password: await Utils.hashPassword('user'),
                },
            ],
            {}
        );
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    },
};
