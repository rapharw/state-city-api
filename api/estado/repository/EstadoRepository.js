const MongoConnection = require("../../../database/MongoConnection");

const Game = require("../model/Estado");

class EstadoRepository extends MongoConnection {

    constructor(){
        super()
    }

    findAll(){
        return new Promise(function(resolve, reject){

            Game.find()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(new Error('Estados not found'))
                });

        })
    }

}

module.exports = () => new EstadoRepository()