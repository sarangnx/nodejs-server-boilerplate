const passport = require('passport');
const APIError = require('../utils/error');

// Used to authenticate each protected route requests.
module.exports = function (req, res, next) {
    // Function to authenticate secure routes
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        try {
            if (err) {
                throw new APIError(info.message, 401, info.stack);
            }
            if (info instanceof Error) {
                throw new APIError(info.message, 401, info.stack);
            }
            // Pass data to next middleware
            req._user = user;
            next();
        } catch (ex) {
            console.log(ex);
            next(ex);
        }
    })(req, res, next);
};
