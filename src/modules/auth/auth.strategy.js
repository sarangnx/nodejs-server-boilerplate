const PassportJwt = require('passport-jwt');
const Service = require('./auth.service.js');
const APIError = require('../utils/error');

const { Strategy: JwtStrategy, ExtractJwt } = PassportJwt;

module.exports = function (passport) {
    // Authenticate Using JWT strategy
    passport.use(
        'jwt',
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_ENCRYPTION,
            },
            async (payload, done) => {
                try {
                    // database query to find user by username
                    const user = await Service.getUserByUserId(payload.userId);

                    if (!user) {
                        throw new APIError('Invalid Token.', 401);
                    }

                    return done(null, payload);
                } catch (err) {
                    return done(err, false, {
                        message: err.message || 'Invalid Token',
                    });
                }
            }
        )
    );
};
