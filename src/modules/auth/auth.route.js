const express = require('express');
const Controller = require('./auth.controller');

const router = express.Router();

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiDescription Login to the app.
 *
 * @apiParam {String} username - Email or Phone number.
 * @apiParam {String} password - Password.
 *
 * @apiSuccess {Object} user - User Object.
 * @apiSuccess {String} user.userId - User ID.
 * @apiSuccess {String} user.name - User's Name
 * @apiSuccess {String} token - JWT Token.
 */
router.post('/login', Controller.login);

/**
 * @api {post} /auth/register Register
 * @apiName Register
 * @apiGroup Auth
 * @apiDescription Register a new user.
 *
 * @apiParam {String} username - Email or Phone
 * @apiParam {String} password - Password
 *
 * @apiSuccess {String} message - Success Message "User created."
 */
router.post('/register', Controller.registerUser);

module.exports = router;
