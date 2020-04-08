const app = require("./config/server/express")();
const conn = require("./database/Config");

app.use((err, req, res, next) => {
    app.errorHandler.handleError(err, res);
});

app.listen(process.env.APP_PORT, function () {
    "use strict";
    app.logger.info(`Servidor escutando na porta ${process.env.APP_PORT}`);

    app.logger.info(`API URL: ${process.env.APP_API_ESTADO}`);

    app.logger.info(`mongodb://${conn.db_user}:${conn.db_password}@${conn.db_host}/${conn.db_name}`);
});