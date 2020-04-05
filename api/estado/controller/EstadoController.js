module.exports = function (app) {
    "use strict";
    let apiEstado = process.env.APP_API_ESTADO;

    /**
     * Lista os Estados
     */
    app.get(`${apiEstado}/`, function (req, res) {
        app.logger.info("Listando estados");
        let estadoRepository = app.estado.repository.EstadoRepository;

        estadoRepository.findAll()
            .then(result => {
                app.logger.info(`Lista de estados: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });
};