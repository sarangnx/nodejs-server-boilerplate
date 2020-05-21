const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV === 'test') {
    // Initialize Environment variables.
    dotenv.config({
        path: path.join(__dirname, '..', '.env.test'),
    });
} else {
    // Initialize Environment variables.
    dotenv.config({
        path: path.join(__dirname, '..', '.env'),
    });
}
