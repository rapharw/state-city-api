const CityValidation = require("../model/City").validation;
const apiCity = process.env.APP_API_CITY;

module.exports = function (app) {
    "use strict";

    /**
     * Return a List of Cities
     */
    app.get(`${apiCity}/`, app.validateApiKey, function (req, res) {
        try{
            app.logger.info(`${req.method} ${apiCity}`);

            let cityRepository = app.city.repository.CityRepository;
            cityRepository.findAll()
                .then(result => {
                    app.logger.info(`List of Cities finded: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Error on list of cities [${req.method} ${apiCity}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });


    /**
     * Get a City by ID
     */
    app.get(`${apiCity}/:idCity`,  app.validateApiKey, function (req, res) {
        try{
            app.logger.info(`${req.method} ${apiCity}/:idCity`);
            let cityRepository = app.city.repository.CityRepository;

            cityRepository.findById(req.params.idCity)
                .then(result => {
                    app.logger.info(`City finded by id: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Error on get a city by ID [${req.method} ${apiCity}/${req.params.idCity}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });


    /**
     * Save a City
     */
    app.post(`${apiCity}`, CityValidation , app.validateApiKey, function(req, res){

        let sendValidationResult = app.expressValidator.sendValidationResult(req, res);
        if(sendValidationResult){
            return sendValidationResult;
        }

        try{

            app.logger.info(`${req.method} ${apiCity}`);

            let city = req.body;
            let cityRepository = app.city.repository.CityRepository;

            cityRepository.save(city)
                .then(result => {
                    app.logger.info(`City saved successfully: ${result}`);
                    res.json(result);
                })
                .catch(error => {
                    app.logger.error(error);
                    res.status(400).json(error.msg);
                });
        }
        catch (e) {
            app.logger.error(`Error on save State [${req.method} ${apiCity}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });


    /**
     * Edit a City
     */
    app.put(`${apiCity}/:idCity`, CityValidation, app.validateApiKey, function(req, res) {

        let sendValidationResult = app.expressValidator.sendValidationResult(req, res);
        if(sendValidationResult){
            return sendValidationResult;
        }

        try{

            app.logger.info(`${req.method} ${apiCity}/:idCity`);

            let cityRepository = app.city.repository.CityRepository;
            let city = req.body;

            cityRepository.edit(req.params.idCity, city)
                .then(result => {
                    app.logger.info(`City edited successfully: ${result}`);
                    res.json(result);
                }).catch(error => {
                app.logger.error(error);
                res.status(400).json(error.msg);
            });
        }
        catch (e) {
            app.logger.error(`Error on edit a City [${req.method} ${apiCity}/${req.params.idCity}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });


    /**
     * Exclui uma City
     */
    app.delete(`${apiCity}/:idCity`, app.validateApiKey, function(req, res) {

        try{

            app.logger.info(`${req.method} ${apiCity}/:idCity`);

            let cityRepository = app.city.repository.CityRepository;
            cityRepository.delete(req.params.idCity)
                .then(() => {
                    app.logger.info(`City deleted successfully: ${req.params.idCity}`);
                    res.json(req.params.idCity);
                }).catch(error => {
                app.logger.error(error);
                res.status(400).json(error.msg);
            });
        }
        catch (e) {
            app.logger.error(`Error on delete a city [${req.method} ${apiCity}/${req.params.idCity}] ${e}`);
            throw new app.errorHandler.ErrorHandler(500, "Internal error");
        }
    });
};
