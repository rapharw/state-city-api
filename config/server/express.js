const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const pinoLogger = require("../log/pino")();

require("custom-env").env(process.env.NODE_ENV);

module.exports = function () {
    "use strict";

    let app = express();

    consign({cwd: "api"})
        .include("estado/controller")
        .into(app);

    //body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //logger
    app.use(pinoLogger.expressLogger);
    app.logger = pinoLogger.logger;

    return app;
};