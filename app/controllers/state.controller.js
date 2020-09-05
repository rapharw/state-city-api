class StateController {

    constructor(app) {
        this._app = app;
    }

    findAll() {
        return new Promise((resolve, reject) => {
            this._app.stateRepo
                .findAll()
                .then(result => {
                    this._app.logger.info(`List of States finded: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    findById(id) {
        return new Promise((resolve, reject) => {
            this._app.stateRepo
                .findById(id)
                .then(result => {
                    this._app.logger.info(`State finded by id: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    findByShortname(shortname) {
        return new Promise((resolve, reject) => {
            this._app.stateRepo
                .findByShortname(shortname)
                .then(result => {
                    this._app.logger.info(`State founded by shortname: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    save(state) {
        return new Promise((resolve, reject) => {
            this._app.stateRepo
                .save(state)
                .then(result => {
                    this._app.logger.info(`State saved successfully: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    edit(id, state) {
        return new Promise((resolve, reject) => {
            this._app.stateRepo.edit(id, state)
                .then(result => {
                    this._app.logger.info(`State edited successfully: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    delete(id) {
        return new Promise((resolve, reject) => {
            this._app.stateRepo.delete(id)
                .then(() => {
                    this._app.logger.info(`State deleted successfully: ${id}`);
                    resolve(id);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };
}
module.exports = () => StateController;