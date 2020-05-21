const bcrypt = require('bcryptjs');
const Models = require('../../models');
const Utils = require('../utils/utils');
const APIError = require('../utils/error');

module.exports = {
    /**
     * @async
     * @function login
     * @description Login a user with username (email or phone) & password.
     * @param {String} data.username - Username (email | phone)
     * @param {String} data.password - Password
     */
    async login(data) {
        Utils.required(['username', 'password'], data);

        // database query to find user by email or phone
        const user = await this.getUserByUsername(data.username);

        // User NOT in the database
        if (!user) {
            throw new APIError('Username or Password Incorrect', 401);
        }

        // Validate password
        if (await bcrypt.compare(data.password, user.password)) {
            // password match
            return user;
        } else {
            throw new APIError('Username or Password Incorrect', 401);
        }
    },

    /**
     * @async
     * @function getUserByUsername
     * @description Returns only minimum amount of data about a user.
     * Only data from users table is returned.
     *
     * @param {String} username - email or phone number
     * @returns {Object} - details of a user.
     */
    async getUserByUsername(username) {
        // database query to find user by email or phone
        const user = await Models.users.findOne({
            where: {
                [Models.Sequelize.Op.or]: {
                    email: username,
                    phone: username,
                },
            },
        });

        return user;
    },

    /**
     * @function getUserByUserId
     * @description Returns only minimum amount of data about a user.
     * Only data from users table is returned.
     *
     * @param {Number} userId - User ID
     * @returns {Object} - details of a user.
     */
    async getUserByUserId(userId) {
        const user = await Models.users.findOne({
            where: {
                userId,
            },
        });

        return user;
    },

    /**
     * @async
     * @function registerUser
     * @description Register a new user using email or phone + password.
     *
     * @param {Object} data - User Data
     */
    async registerUser(data) {
        let fieldName = getFieldName(data.username);

        /***
         * Add username as (phone|email) and password fields
         * to options object, to pass to Database.
         */
        data[fieldName] = data.username;
        data.password = await Utils.hashPassword(data.password);

        Utils.requireAny(['email', 'phone'], data);
        Utils.required(['password'], data);

        // check if usergroup belongs to the listed 4
        const match = ['user', 'shopowner', 'staff', 'delivery'].indexOf(data.usergroup);
        if (match === -1) {
            data.usergroup = 'user';
        }

        const user = await Models.users.create(data);

        return user;
    },
};

/**
 * @function getFieldName
 * Check if the username is email or phone number and return the type.
 * @param {String} username - Email or phone number used for login.
 *
 * @returns {String} Field Name
 */
function getFieldName(username) {
    const phoneRegEx = /^[0-9]{10}$/g;
    const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    /***
     * Check if username is a phone number or email
     * and give name to field accordingly.
     */
    let fieldName = '';
    if (phoneRegEx.test(username)) {
        fieldName = 'phone';
    } else if (emailRegEx.test(username)) {
        fieldName = 'email';
    } else {
        throw new APIError('Invalid Phone / Email', 400);
    }

    return fieldName;
}
