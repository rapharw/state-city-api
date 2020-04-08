const EstadoValidation = require("../model/Estado").validation;
const apiEstado = process.env.APP_API_ESTADO;

module.exports = function (app) {
    "use strict";

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


    /**
     * Busca um Estado pelo ID
     */
    app.get(`${apiEstado}/:idEstado`, function (req, res) {
        app.logger.info("Buscando estado");
        let estadoRepository = app.estado.repository.EstadoRepository;

        estadoRepository.findById(req.params.idEstado)
            .then(result => {
                app.logger.info(`Estado: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Cadastra um Estado
     */
    app.post(`${apiEstado}`, EstadoValidation ,function(req, res){

        app.expressValidator.sendValidationResult(req, res);

        app.logger.info("Cadastrando estado");

        let estado = req.body;
        estado.dataCriacao = new Date();
        estado.dataUltAlt = new Date();

        let estadoRepository = app.estado.repository.EstadoRepository;

        estadoRepository.save(estado)
            .then(result => {
                app.logger.info(`Estado salvo com sucesso: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Edita um Estado
     */
    app.put(`${apiEstado}/:idEstado`, EstadoValidation, function(req, res) {

        app.expressValidator.sendValidationResult(req, res);

        app.logger.info("Editando estado");

        let estadoRepository = app.estado.repository.EstadoRepository;
        let estado = req.body;

        estado.dataUltAlt = new Date();
        estadoRepository.edit(req.params.idEstado, estado)
                        .then(result => {
                            app.logger.info(`Estado: ${result}`);
                            res.json(result);
                        }).catch(error => res.json(error))
    });

    /**
     * Exclui um Estado
     */
    app.delete(`${apiEstado}/:idEstado`, function(req, res) {

        app.logger.info("Excluindo estado");

        let estadoRepository = app.estado.repository.EstadoRepository;
        estadoRepository.delete(req.params.idEstado)
            .then(() => {
                app.logger.info(`Estado: ${req.params.idEstado}`);
                res.json(req.params.idEstado);
            }).catch(error => res.json(error))
    });
}