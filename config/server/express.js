const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const pinoLogger = require("../log/pino")();

require("custom-env").env(process.env.NODE_ENV);

module.exports = function () {
    "use strict";

    let app = express();

    //diz para o express utilizar o module body-parser, convertendo para json
    app.use(bodyParser.json());

    //logger
    app.use(pinoLogger.expressLogger);
    app.logger = pinoLogger.logger;

    consign({cwd: "api"})
        .include("estado/controller")
        .then("estado/repository")
        .into(app);
    return app;
};