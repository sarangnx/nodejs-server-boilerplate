// Custom Error Obejct
class APIError extends Error {
    constructor(message, statusCode, stack) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, APIError);
        }
    }
}

module.exports = APIError;
