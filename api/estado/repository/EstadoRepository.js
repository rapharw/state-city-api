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
                    reject({msg: "Erro ao buscar lista de estados", error: error})
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
                    reject({msg: "Estado não encontrado", error: error})
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
                            reject({msg: "Estado já existe", error: error})
                        }
                        else
                            reject({msg: "Erro ao salvar estado", error: error})
                    });
        });
    }

    edit(id, objEstadoEdita){
        return new Promise(function(resolve, reject){
            Estado.findOneAndUpdate({ "_id": id }, { "$set": objEstadoEdita}).exec(function(err, estado){
                if(err) {
                    reject({msg: "Erro ao editar estado", error: err})
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
                    reject({msg: "Erro ao excluir estado", error: err})
                else
                    resolve()
            });
        });
    }
}

module.exports = () => new EstadoRepository();