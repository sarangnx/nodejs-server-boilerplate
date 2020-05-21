// Initialize config
require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const socketio = require('socket.io');
const APIError = require('./modules/utils/error');
const ErrorHandler = require('./modules/utils/errorHandler');
const routes = require('./modules');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

// set socketio to response object
app.use((req, res, next) => {
    res.io = io;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Enable Cross Origin Requests
 * Essential since Backend and Front end are
 * seperated. Both servers run on different
 * ports, making the api requests cors.
 */
app.use(cors());

/**
 * Register Passport middleware for authentication
 */
app.use(passport.initialize());

// Register Routes
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new APIError('Requested URL Not Found', 404);
    next(err);
});

// Error Handler Middleware
app.use(ErrorHandler);

module.exports.app = app;
module.exports.server = server;
