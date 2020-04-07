const MongoConnection = require("../../../database/MongoConnection");

const Estado = require("../model/Estado");

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
                        console.log(result)
                        resolve(result);
                    }
                    ,error => {
                        console.log(error)
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
}

module.exports = () => new EstadoRepository();