const pino = require("pino");
const expressPino = require("express-pino-logger");

const logger = pino({level: process.env.LOG_LEVEL || "info", prettyPrint: true});
const expressLogger = expressPino({logger});

module.exports = function () {
    "use strict";
    return {"expressLogger": expressLogger, "logger": logger};
};