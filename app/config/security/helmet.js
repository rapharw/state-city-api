const helmet = require("helmet");
const csp = require("helmet-csp");

module.exports = function (app) {
    "use strict";

    app.use(helmet());
    //script-src 'self' 'unsafe-inline
    app.use(csp({
        directives: {
            scriptSrc: ["'self'", "fonts.googleapis.com", "'unsafe-eval'", "'unsafe-inline'"]
        }
    }));
};