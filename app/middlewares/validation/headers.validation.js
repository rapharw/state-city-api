module.exports = function (app) {
    "use strict";
    app.validateApiKey = function validateApiKey(req, res, next) {
        let token = req.headers["x-api-key"];
        // if (!token) {
        //     return res.status(401).json({auth: false, message: "Token is empty"});
        // }
        // if (process.env.SECRET !== token) {
        //     return res.status(500).json({auth: false, message: "Token is invalid"});
        // }
        next();
    };
};