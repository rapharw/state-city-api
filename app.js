const app = require("./app/config/server/express")();
app.errorHandler = require("./app/config/error/error.handler");

const conn = require("./app/database/Config");

//listen
app.listen(process.env.PORT || 5000, function () {
    "use strict";

    app.logger.info(`Env: ${process.env.NODE_ENV}`);
    app.logger.info(`Server listening on port ${process.env.PORT || 5000}`);

    app.logger.info(`API URL: ${process.env.APP_API_STATE}`);
    app.logger.info(`API URL: ${process.env.APP_API_CITY}`);

    app.logger.info(`mongodb://${conn.db_user}:${conn.db_password}@${conn.db_host}/${conn.db_name}`);
});

//error handler
app.use((err, req, res, next) => {
    app.errorHandler.handleError(err, res);
});

//root
app.get("/", (req, res) => res.json("APP IS STARTED"));



