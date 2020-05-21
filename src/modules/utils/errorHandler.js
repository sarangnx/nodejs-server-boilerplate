/**
 * Error Handler Middleware, catches errors, sends appropriate
 * HTTP response and logs error messages.
 */
const logger = require('./winston.js');

module.exports = function (err, req, res, next) {
    let response = {};

    // Send message to user only if it is an APIError
    if (err.name === 'APIError') {
        response = {
            message: err.message,
        };
    } else {
        response = {
            message: 'Something went wrong.',
        };
    }

    const code = parseInt(err.statusCode, 10) || 500;

    res.status(code);
    res.json({
        error: response,
    });

    const message = `${req.method || ''} ${req.url || ''} ${err.message}`;
    logger.error(message);
};
