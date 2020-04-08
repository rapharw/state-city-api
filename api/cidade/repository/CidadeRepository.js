const MongoConnection = require("../../../database/MongoConnection");

const Cidade = require("../model/Cidade").model;
const Estado = require("../../estado/model/Estado").model;

class CidadeRepository extends MongoConnection {

    constructor(){
        super()
    }

    /**
     * Busca a lista de cidades
     * @returns {Promise<unknown>}
     */
    findAll(){

        return new Promise(function(resolve, reject){


            Cidade.find({})
                .populate("estadoId")
                .exec(function(error, posts) {
                    if(error){
                        reject(new Error("Lista de cidades não encontrada"));
                    }
                    resolve(posts);
                });

        });
    }


    findById(id){

        return new Promise(function(resolve, reject){

            Cidade.findOne({_id: id})
                .populate("estadoId")
                .exec(function(error, posts) {
                    if(error){
                        reject(new Error("Cidades não encontrada"));
                    }
                    resolve(posts);
                });

        })
    }

    save(objSalva){
        return new Promise(function(resolve, reject){

            const cidade = new Cidade(objSalva);
            cidade.save()
                .then(result => {
                        resolve(result);
                    }
                    ,error => {
                        if(error.code === 11000){
                            reject(new Error("Cidade já existe"))
                        }
                        else
                            reject(new Error("Erro inesperado ao salvar uma cidade"));
                    });
        });
    }

    edit(id, objEdita){
        return new Promise(function(resolve, reject){
            Cidade.findOneAndUpdate({ "_id": id }, { "$set": objEdita}).exec(function(err, cidade){
                if(err) {
                    reject(new Error("Erro inesperado ao editar uma cidade"));
                } else {
                    resolve(cidade);
                }
            });
        });
    }


    delete(id){
        return new Promise(function(resolve, reject){
            Cidade.deleteOne({ "_id": id }, function (err) {
                if (err)
                    reject(new Error("Erro ao excluir uma cidade"));
                else
                    resolve()
            });
        });
    }
}

module.exports = () => new CidadeRepository();