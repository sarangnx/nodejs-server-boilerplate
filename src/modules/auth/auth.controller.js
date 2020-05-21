const jwt = require('jsonwebtoken');
const passport = require('passport');
const _ = require('lodash');
const Service = require('./auth.service');

// Initialize Passport Strategy
require('./auth.strategy')(passport);

module.exports = {
    /**
     * @async
     * @function login
     * @description Login to app.
     */
    async login(req, res, next) {
        try {
            const userdata = req.body;

            const user = await Service.login(userdata);
            const filteredUser = _.pick(user, ['userId', 'name']);

            // sign the payload with jwt.
            const token = await jwt.sign(filteredUser, process.env.JWT_ENCRYPTION, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

            return res.json({
                message: 'Login Successful',
                user: filteredUser,
                token,
            });
        } catch (err) {
            next(err);
        }
    },

    /**
     * @async
     * @function registerUser
     * @description Create a new user with email or phone + password
     * as login method.
     */
    async registerUser(req, res, next) {
        try {
            const userdata = req.body;

            await Service.registerUser(userdata);

            res.json({
                message: 'User created.',
            });
        } catch (err) {
            next(err);
        }
    },
};
