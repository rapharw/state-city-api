const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const pinoLogger = require("../log/pino")();
const {validationResult} = require("express-validator");

require("custom-env").env(process.env.NODE_ENV);

function sendValidationResult(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}

module.exports = function () {
    "use strict";

    let app = express();

    //diz para o express utilizar o module body-parser, convertendo para json
    app.use(bodyParser.json());

    //logger
    app.use(pinoLogger.expressLogger);
    app.logger = pinoLogger.logger;

    //Validar json input
    app.expressValidator = {
        sendValidationResult: sendValidationResult
    };

    consign({cwd: "api"})
        .include("estado/controller")
        .then("estado/repository")
        .into(app);
    return app;
};