const StateValidation = require("../model/State").validation;
const apiState = process.env.APP_API_STATE;

module.exports = function (app) {
    "use strict";

    /**
     * Return a List of States
     */
    app.get(`${apiState}/`, app.validateApiKey, function (req, res) {
        try{

            app.logger.info(`${req.method} ${apiState}`);
            let stateRepository = app.state.repository.StateRepository;

            stateRepository.findAll()
                .then(result => {
                    app.logger.info(`List of States finded: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Error on list of states [${req.method} ${apiState}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }

    });


    /**
     * Get a State by ID
     */
    app.get(`${apiState}/:idState`,  app.validateApiKey, function (req, res) {
        try{

            app.logger.info(`${req.method} ${apiState}/:idState`);
            let stateRepository = app.state.repository.StateRepository;

            stateRepository.findById(req.params.idState)
                .then(result => {
                    app.logger.info(`State finded by id: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Error on get a state by ID [${req.method} ${apiState}/${req.params.idState}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });


    /**
     * Save a State
     */
    app.post(`${apiState}`, StateValidation , app.validateApiKey, function(req, res){

        let sendValidationResult = app.expressValidator.sendValidationResult(req, res);
        if(sendValidationResult){
            return sendValidationResult;
        }

        try{

            app.logger.info(`${req.method} ${apiState}`);

            let state = req.body;
            let stateRepository = app.state.repository.StateRepository;

            app.logger.info(`Saving State - ${JSON.stringify(state)}`);

            stateRepository.save(state)
                .then(result => {
                    app.logger.info(`State saved successfully: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Error on save State [${req.method} ${apiState}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });


    /**
     * Edit a State
     */
    app.put(`${apiState}/:idState`, StateValidation, app.validateApiKey, function(req, res) {

        let sendValidationResult = app.expressValidator.sendValidationResult(req, res);
        if(sendValidationResult){
            return sendValidationResult;
        }

        try{

            app.logger.info(`${req.method} ${apiState}/:idState`);

            let stateRepository = app.state.repository.StateRepository;
            let state = req.body;

            stateRepository.edit(req.params.idState, state)
                            .then(result => {
                                app.logger.info(`State edited successfully: ${result}`);
                                res.json(result);
                            })
                .catch(error => {
                app.logger.error(error);
                res.status(400).json(error.msg);
            });
        }
        catch (e) {
            app.logger.error(`Error on edit a State [${req.method} ${apiState}/${req.params.idState}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });

    /**
     * Delete a State
     */
    app.delete(`${apiState}/:idState`, app.validateApiKey, function(req, res) {

        try{

            app.logger.info(`${req.method} ${apiState}/:idState`);

            let stateRepository = app.state.repository.StateRepository;
            stateRepository.delete(req.params.idState)
                .then(() => {
                    app.logger.info(`State deleted successfully: ${req.params.idState}`);
                    res.json(req.params.idState);
                }).catch(error => {
                app.logger.error(error);
                res.status(400).json(error.msg);
            });
        }
        catch (e) {
            app.logger.error(`Error on delete a State [${req.method} ${apiState}/${req.params.idState}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });
}