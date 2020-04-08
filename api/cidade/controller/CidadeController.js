const CidadeValidation = require("../model/Cidade").validation;
const apiCidade = process.env.APP_API_CIDADE;

module.exports = function (app) {
    "use strict";

    /**
     * Lista as Cidades
     */
    app.get(`${apiCidade}/`, app.validaApiKey, function (req, res) {
        app.logger.info("Listando cidades");
        let cidadeRepository = app.cidade.repository.CidadeRepository;

        cidadeRepository.findAll()
            .then(result => {
                app.logger.info(`Lista de cidades: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Busca uma Cidade pelo ID
     */
    app.get(`${apiCidade}/:idCidade`,  app.validaApiKey, function (req, res) {
        app.logger.info("Buscando cidade");
        let cidadeRepository = app.cidade.repository.CidadeRepository;

        cidadeRepository.findById(req.params.idCidade)
            .then(result => {
                app.logger.info(`Cidade: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Cadastra uma Cidade
     */
    app.post(`${apiCidade}`, CidadeValidation , app.validaApiKey, function(req, res){

        app.expressValidator.sendValidationResult(req, res);

        app.logger.info("Cadastrando cidade");

        let cidade = req.body;
        cidade.dataCriacao = new Date();
        cidade.dataUltAlt = new Date();

        let cidadeRepository = app.cidade.repository.CidadeRepository;

        cidadeRepository.save(cidade)
            .then(result => {
                app.logger.info(`Cidade salva com sucesso: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Edita uma Cidade
     */
    app.put(`${apiCidade}/:idCidade`, CidadeValidation, app.validaApiKey, function(req, res) {

        app.expressValidator.sendValidationResult(req, res);

        app.logger.info("Editando cidade");

        let cidadeRepository = app.cidade.repository.CidadeRepository;
        let cidade = req.body;

        cidade.dataUltAlt = new Date();
        cidadeRepository.edit(req.params.idCidade, cidade)
            .then(result => {
                app.logger.info(`Cidade: ${result}`);
                res.json(result);
            }).catch(error => res.json(error));
    });


    /**
     * Exclui uma Cidade
     */
    app.delete(`${apiCidade}/:idCidade`, app.validaApiKey, function(req, res) {

        app.logger.info("Excluindo cidade");

        let cidadeRepository = app.cidade.repository.CidadeRepository;
        cidadeRepository.delete(req.params.idCidade)
            .then(() => {
                app.logger.info(`Cidade: ${req.params.idCidade}`);
                res.json(req.params.idCidade);
            }).catch(error => res.json(error))
    });
};
