class CityController {

    constructor(app){
        this._app = app;
    }

    findAll () {
        return new Promise((resolve, reject) => {
            this._app.cityRepo
                .findAll()
                .then(result => {
                    this._app.logger.info(`List of Cities finded: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    findById (id) {
        return new Promise((resolve, reject) => {
            this._app.cityRepo
                .findById(id)
                .then(result => {
                    this._app.logger.info(`City finded by id: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    save (city) {
        return new Promise((resolve, reject) => {
            this._app.cityRepo
                .save(city)
                .then(result => {
                    this._app.logger.info(`City saved successfully: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    edit(id, city){
        return new Promise((resolve, reject) => {
            this._app.cityRepo.edit(id, city)
                .then(result => {
                    this._app.logger.info(`City edited successfully: ${result}`);
                    resolve(result);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
                });
        });
    };

    delete(id){
        return new Promise((resolve, reject) => {
            this._app.stateRepo.delete(id)
                .then(() => {
                    this._app.logger.info(`City deleted successfully: ${id}`);
                    resolve(id);
                })
                .catch(error => {
                    this._app.logger.error(error);
                    reject(new Error(error.msg));
            });
        });
    };
}
module.exports = () => CityController;