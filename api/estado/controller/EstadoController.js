const EstadoValidation = require("../model/Estado").validation;
const apiEstado = process.env.APP_API_ESTADO;

module.exports = function (app) {
    "use strict";

    /**
     * Lista os Estados
     */
    app.get(`${apiEstado}/`, app.validaApiKey, function (req, res) {
        try{

            app.logger.info("Listando estados");
            let estadoRepository = app.estado.repository.EstadoRepository;

            estadoRepository.findAll()
                .then(result => {
                    app.logger.info(`Lista de estados: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Erro ao listar estados [${req.method} ${apiEstado}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Erro interno da aplicação");
        }

    });


    /**
     * Busca um Estado pelo ID
     */
    app.get(`${apiEstado}/:idEstado`,  app.validaApiKey, function (req, res) {
        try{

            app.logger.info("Buscando estado");
            let estadoRepository = app.estado.repository.EstadoRepository;

            estadoRepository.findById(req.params.idEstado)
                .then(result => {
                    app.logger.info(`Estado: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Erro ao buscar estado [${req.method} ${apiEstado}/${req.params.idEstado}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Erro interno da aplicação");
        }
    });


    /**
     * Cadastra um Estado
     */
    app.post(`${apiEstado}`, EstadoValidation , app.validaApiKey, function(req, res){

        app.expressValidator.sendValidationResult(req, res);

        try{

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
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Erro ao cadastrar estado [${req.method} ${apiEstado}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Erro interno da aplicação");
        }
    });


    /**
     * Edita um Estado
     */
    app.put(`${apiEstado}/:idEstado`, EstadoValidation, app.validaApiKey, function(req, res) {

        app.expressValidator.sendValidationResult(req, res);

        try{

            app.logger.info("Editando estado");

            let estadoRepository = app.estado.repository.EstadoRepository;
            let estado = req.body;

            estado.dataUltAlt = new Date();
            estadoRepository.edit(req.params.idEstado, estado)
                            .then(result => {
                                app.logger.info(`Estado: ${result}`);
                                res.json(result);
                            })
                .catch(error => {
                app.logger.error(error);
                res.status(400).json(error.msg);
            });
        }
        catch (e) {
            app.logger.error(`Erro ao editar estado [${req.method} ${apiEstado}/${req.params.idEstado}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Erro interno da aplicação");
        }
    });

    /**
     * Exclui um Estado
     */
    app.delete(`${apiEstado}/:idEstado`, app.validaApiKey, function(req, res) {

        try{

            app.logger.info("Excluindo estado");

            let estadoRepository = app.estado.repository.EstadoRepository;
            estadoRepository.delete(req.params.idEstado)
                .then(() => {
                    app.logger.info(`Estado: ${req.params.idEstado}`);
                    res.json(req.params.idEstado);
                }).catch(error => {
                app.logger.error(error);
                res.status(400).json(error.msg);
            });
        }
        catch (e) {
            app.logger.error(`Erro ao excluir estado [${req.method} ${apiEstado}/${req.params.idEstado}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Erro interno da aplicação");
        }
    });
}