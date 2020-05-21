// Register Routes
const auth = require('./auth/auth.route');

module.exports = function (app) {
    app.use('/api/auth', auth);
};
