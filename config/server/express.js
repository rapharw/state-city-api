const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const pinoLogger = require("../log/pino")();
const {validationResult} = require("express-validator");
const cors = require("cors");
const {handleError, ErrorHandler} = require("../error/Error");
require("custom-env").env(process.env.NODE_ENV);


/**
 * Return Express-Validator
 * @param req
 * @param res
 * @returns {*|Promise<any>}
 */
function sendValidationResult(req, res) {
    "use strict";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    return null;
}


/**
 * Verify Header x-api-key
 * @param req
 * @param res
 * @param next
 */
function validateApiKey(req, res, next) {
    "use strict";
    let token = req.headers["x-api-key"];
    if (!token) {
        res.status(401).json({auth: false, message: "Token is empty"});
        return;
    }
    if (process.env.SECRET !== token) {
        res.status(500).json({auth: false, message: "Token is invalid"});
        return;
    }
    next();
}


module.exports = function () {
    "use strict";

    let app = express();

    //tells express to use module body-parser, converting to json
    app.use(bodyParser.json());

    app.use(cors());

    //logger
    app.use(pinoLogger.expressLogger);
    app.logger = pinoLogger.logger;

    //Validate json input
    app.expressValidator = {
        sendValidationResult: sendValidationResult
    };

    app.validateApiKey = validateApiKey;

    app.errorHandler = {
        handleError: handleError,
        ErrorHandler: ErrorHandler
    };

    consign({cwd: "api"})
        .include("state/controller")
        .then("state/repository")
        .then("city/controller")
        .then("city/repository")
        .then("../config/security")
        .into(app);
    return app;
};