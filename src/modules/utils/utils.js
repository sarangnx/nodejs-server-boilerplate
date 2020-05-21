const bcrypt = require('bcryptjs');
const APIError = require('./error');

module.exports = {
    /**
     * @async
     * @function hashPassword
     * @description Hash a plaintext password using bcryptjs
     *
     * @param {String} password - Plaintext Password
     *
     * @returns {String} Returns hashed password.
     */
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, 8);
        return hash;
    },

    /**
     * @function required
     * @description Used to throw an error if Object keys are missing.
     *
     * @param {Array} properties - Array of properties / object key names.
     * @param {Object} object - Object which is to be checked.
     */
    required(properties, object = {}) {
        properties.forEach((property) => {
            if (!Object.prototype.hasOwnProperty.call(object, property)) {
                // Bad Rerquest (400)
                throw new APIError(`${property} required.`, 400);
            }
        });
    },

    /**
     * @function requireAny
     * @description Used to throw an error if no key in the list of keys
     * is found in the object.
     *
     * @param {Array} properties - Array of properties / object key names.
     * @param {Object} object - Object which is to be checked.
     *
     * @returns {String} Returns first non-null key.
     */
    requireAny(properties, object = {}) {
        // return first property that is not null
        // eslint-disable-next-line consistent-return, array-callback-return
        const match = properties.find((property) => {
            if (Object.prototype.hasOwnProperty.call(object, property)) {
                return property;
            }
        });

        if (!match) {
            const message = `Any one of ${properties.toString()} is required.`;
            throw new APIError(message, 400);
        }

        return match;
    },
};
