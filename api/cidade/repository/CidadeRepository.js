const MongoConnection = require("../../../database/MongoConnection");

const Cidade = require("../model/Cidade").model;

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
                        reject({msg: "Erro ao buscar lista de cidades", error: error});
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
                        reject({msg: "Cidade não encontrada", error: error});
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
                            reject({msg: "Cidade já existe", error: error})
                        }
                        else
                            reject({msg: "Erro ao salvar cidade", error: error})
                    });
        });
    }

    edit(id, objEdita){
        return new Promise(function(resolve, reject){
            Cidade.findOneAndUpdate({ "_id": id }, { "$set": objEdita}).exec(function(err, cidade){
                if(err) {
                    reject({msg: "Erro ao editar cidade", error: err})
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
                    reject({msg: "Erro ao excluir cidade", error: err})
                else
                    resolve()
            });
        });
    }
}

module.exports = () => new CidadeRepository();