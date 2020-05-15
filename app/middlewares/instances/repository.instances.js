module.exports = function (app) {
    "use strict";
    app.stateRepo = new app.repositories.StateRepository();
    app.cityRepo = new app.repositories.CityRepository();
};