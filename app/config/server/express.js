const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const pinoLogger = require("../log/pino")();
const cors = require("cors");
const expressStatusMonitor = require("express-status-monitor");
const compression = require("compression");

require("dotenv").config();

module.exports = function () {
    "use strict";

    let app = express();

    //tells express to use module body-parser, converting to json
    app.use(bodyParser.json());

    //cors
    app.use(cors());

    //logger
    app.use(pinoLogger.expressLogger);
    app.logger = pinoLogger.logger;

    //express-status-monitor
    app.use(expressStatusMonitor());

    //gzip
    app.use(compression());

    consign({
        cwd: "app",
        locale: "pt-br"
    })
        .include("repositories")
        .include("middlewares/validation")
        .then("middlewares/instances")
        .then("controllers")
        .then("routes")
        .then("config/security")
        .into(app);
    return app;
};