const apiCity = process.env.APP_API_CITY;
const CityValidation = require("../models/City").validation;
const cityController = require("../controllers/city.controller")();
module.exports = function (app) {
    "use strict";

    /**
     * Return a List of Cities
     */
    app.get(`${apiCity}`, app.validateApiKey, async function(_,res, next){
        try {
            await new cityController(app).findAll().then(result => res.json(result));
        } catch (e) {
            app.logger.error(`Error on list of cities - ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });


    /**
     * Get a City by ID
     */
    app.get(`${apiCity}/:idCity`,  app.validateApiKey, async function (req, res, next) {
        try{
            await new cityController(app).findById(req.params.idCity).then(result => res.json(result));
        }
        catch (e) {
            app.logger.error(`Error on get a City by ID [${req.method} ${apiCity}/${req.params.idCity}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });



    /**
     * Save a City
     */
    app.post(`${apiCity}`, CityValidation , [app.validateApiKey, app.expressValidator.sendValidationResult], async function(req, res, next){

        try{
            let city = req.body;
            await new cityController(app).save(city).then(result => res.json(result));
        }
        catch (e) {
            app.logger.error(`Error on save City [${req.method} ${apiCity}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });


    /**
     * Edit a City
     */
    app.put(`${apiCity}/:idCity`, CityValidation, [app.validateApiKey, app.expressValidator.sendValidationResult], async function(req, res, next) {

        try{
            let city = req.body;
            await new cityController(app).edit(req.params.idCity, city).then(result => res.json(result));
        }
        catch (e) {
            app.logger.error(`Error on edit a City [${req.method} ${apiCity}/${req.params.idCity}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });


    /**
     * Delete a City
     */
    app.delete(`${apiCity}/:idCity`, app.validateApiKey, async function(req, res, next) {

        try{
            await new cityController(app).delete(req.params.idCity).then(() => res.json(req.params.idCity));
        }
        catch (e) {
            app.logger.error(`Error on delete a City [${req.method} ${apiCity}/${req.params.idCity}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });
};