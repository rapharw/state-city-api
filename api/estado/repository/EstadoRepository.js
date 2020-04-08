const MongoConnection = require("../../../database/MongoConnection");

const Estado = require("../model/Estado").model;

class EstadoRepository extends MongoConnection {

    constructor(){
        super()
    }

    /**
     * Busca a lista de estados
     * @returns {Promise<unknown>}
     */
    findAll(){

        return new Promise(function(resolve, reject){

            Estado.find()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(new Error("Lista de estados não encontrada"))
                });

        })
    }


    findById(id){

        return new Promise(function(resolve, reject){

            Estado.find({_id:id})
                .then(result => {
                    if(result.length === 0)
                        resolve({result});
                    else
                        resolve(result[0])
                })
                .catch(error => {
                    reject(new Error("Estado não encontrado"))
                });

        })
    }

    save(objEstadoSalva){
        return new Promise(function(resolve, reject){

            const estado = new Estado(objEstadoSalva);
            estado.save()
                .then(result => {
                        resolve(result);
                    }
                    ,error => {
                        if(error.code === 11000){
                            reject(new Error("Estado já existe"))
                        }
                        else
                            reject(new Error("Erro inesperado ao salvar um estado"));
                    });
        });
    }

    edit(id, objEstadoEdita){
        return new Promise(function(resolve, reject){
            Estado.findOneAndUpdate({ "_id": id }, { "$set": objEstadoEdita}).exec(function(err, estado){
                if(err) {
                    reject(new Error("Erro inesperado ao editar um estado"));
                } else {
                    resolve(estado);
                }
            });
        });
    }


    delete(id){
        return new Promise(function(resolve, reject){
            Estado.deleteOne({ "_id": id }, function (err) {
                if (err)
                    reject(new Error("Erro ao excluir um estado"));
                else
                    resolve()
            });
        });
    }
}

module.exports = () => new EstadoRepository();