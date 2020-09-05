const apiState = process.env.APP_API_STATE;
const StateValidation = require("../models/State").validation;
const stateController = require("../controllers/state.controller")();
module.exports = function (app) {
    "use strict";

    /**
     * Return a List of States
     */
    app.get(`${apiState}`, app.validateApiKey, async function (_, res, next) {
        try {
            await new stateController(app).findAll().then(result => res.json(result));
        } catch (e) {
            app.logger.error(`Error on list of states - ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });


    /**
     * Get a State by ID or Shortname
     */
    app.get(`${apiState}/:state`, app.validateApiKey, async function (req, res, next) {
        try {
            if (req.params.state.length === 2) {
                await new stateController(app).findByShortname(req.params.state).then(result => res.json(result));
            } else {
                await new stateController(app).findById(req.params.state).then(result => res.json(result));
            }
        } catch (e) {
            app.logger.error(`Error on get a state by ID [${req.method} ${apiState}/${req.params.state}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });


    /**
     * Save a State
     */
    app.post(`${apiState}`, StateValidation, [app.validateApiKey, app.expressValidator.sendValidationResult], async function (req, res, next) {

        try {
            let state = req.body;
            await new stateController(app).save(state).then(result => res.json(result));
        } catch (e) {
            app.logger.error(`Error on save State [${req.method} ${apiState}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });


    /**
     * Edit a State
     */
    app.put(`${apiState}/:idState`, StateValidation, [app.validateApiKey, app.expressValidator.sendValidationResult], async function (req, res, next) {

        try {
            let state = req.body;
            await new stateController(app).edit(req.params.idState, state).then(result => res.json(result));
        } catch (e) {
            app.logger.error(`Error on edit a State [${req.method} ${apiState}/${req.params.idState}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });


    /**
     * Delete a State
     */
    app.delete(`${apiState}/:idState`, app.validateApiKey, async function (req, res, next) {

        try {
            await new stateController(app).delete(req.params.idState).then(() => res.json(req.params.idState));
        } catch (e) {
            app.logger.error(`Error on delete a State [${req.method} ${apiState}/${req.params.idState}] ${e}`);
            next(new app.errorHandler.ErrorHandler(500, `Internal error | ${e}`));
        }
    });
};