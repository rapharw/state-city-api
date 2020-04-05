module.exports = function (app) {
    "use strict";
    let apiEstado = process.env.APP_API_ESTADO;

    /**
     * Lista os Estados
     */
    app.get(`${apiEstado}/`, function (req, res) {
        app.logger.info("Listando estados");
        res.json([{"nome": "RJ"}]);
    });
};