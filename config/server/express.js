const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const pinoLogger = require("../log/pino")();
const {validationResult} = require("express-validator");
const cors = require("cors");
const {handleError, ErrorHandler} = require("../error/Error");
require("custom-env").env(process.env.NODE_ENV);


/**
 * Retorna critica com as validacoes dos Modelos (ex: Estado, Cidade)
 * @param req
 * @param res
 * @returns {*|Promise<any>}
 */
function sendValidationResult(req, res){
    "use strict";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}


/**
 * Verifica existencia de token x-api-key
 * @param req
 * @param res
 * @param next
 */
function validaApiKey(req, res, next) {
    "use strict";
    let token = req.headers["x-api-key"];
    if (!token) {
        res.status(401).json({auth: false, message: "Token não informado."});
        return;
    }
    if (process.env.SECRET !== token) {
        res.status(500).json({auth: false, message: "Token inválido."});
        return;
    }
    next();
}


module.exports = function () {
    "use strict";

    let app = express();

    //diz para o express utilizar o module body-parser, convertendo para json
    app.use(bodyParser.json());

    app.use(cors());

    //logger
    app.use(pinoLogger.expressLogger);
    app.logger = pinoLogger.logger;

    //Validar json input
    app.expressValidator = {
        sendValidationResult: sendValidationResult
    };

    app.validaApiKey = validaApiKey;

    app.errorHandler = {
        handleError: handleError,
        ErrorHandler: ErrorHandler
    };

    consign({cwd: "api"})
        .include("estado/controller")
        .then("estado/repository")
        .then("cidade/controller")
        .then("cidade/repository")
        .then("../config/security")
        .into(app);
    return app;
};