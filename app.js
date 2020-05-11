const app = require("./config/server/express")();
const conn = require("./database/Config");

app.use((err, req, res, next) => {
    app.errorHandler.handleError(err, res);
});

app.listen(process.env.PORT || 5000, function () {
    "use strict";
    app.logger.info(`Server listening on port ${process.env.PORT || 5000}`);

    app.logger.info(`API URL: ${process.env.APP_API_STATE}`);
    app.logger.info(`API URL: ${process.env.APP_API_CITY}`);

    app.logger.info(`mongodb://${conn.db_user}:${conn.db_password}@${conn.db_host}/${conn.db_name}`);
});

app.get("/", function(req, res) {
    "use strict";
    res.json("APP IS STARTED");
});