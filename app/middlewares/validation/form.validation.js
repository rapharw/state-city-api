const {validationResult} = require("express-validator");

module.exports = (app) => {

    //Validate json input
    app.expressValidator = {
        sendValidationResult: async function sendValidationResult(req, res, next){
            "use strict";
            const errors = await validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
            }
            return next();
        }
    }
}
