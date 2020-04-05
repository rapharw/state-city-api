const app = require("./config/server/express")();
app.listen(process.env.APP_PORT, function () {
    "use strict";
    app.logger.info(`Servidor escutando na porta ${process.env.APP_PORT}`);

    app.logger.info(`API URL: ${process.env.APP_API_ESTADO}`);
});

