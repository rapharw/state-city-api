const MongoConnection = require("../../../database/MongoConnection");

const State = require("../model/State").model;

class StateRepository extends MongoConnection {

    constructor(){
        super()
    }


    findAll(){

        return new Promise(function(resolve, reject){

            State.find()
                .then(result => resolve(result))
                .catch(error => {
                    reject({msg: "Error on get List of States", error: error})
                });

        })
    }


    findById(id){

        return new Promise(function(resolve, reject){

            State.find({_id:id})
                .then(result => {
                    if(result.length === 0)
                        resolve({result});
                    else
                        resolve(result[0])
                })
                .catch(error => {
                    reject({msg: "State not found", error: error})
                });

        })
    }


    save(toSave){
        return new Promise(function(resolve, reject){

            toSave.dateCreated = new Date();
            toSave.dateLastUpdated = new Date();

            const state = new State(toSave);
            state.save()
                .then(result => {
                        resolve(result);
                    }
                    ,error => {
                        if(error.code === 11000){
                            reject({msg: "State is already exist", error: error})
                        }
                        else
                            reject({msg: "Error on save State", error: error})
                    });
        });
    }


    edit(id, toEdit){
        return new Promise(function(resolve, reject){

            toEdit.dateLastUpdated = new Date();
            State.findOneAndUpdate({ "_id": id }, { "$set": toEdit}).exec(function(err, state){
                if(err) {
                    reject({msg: "Error on edit State", error: err})
                } else {
                    resolve(state);
                }
            });
        });
    }


    delete(id){
        return new Promise(function(resolve, reject){
            State.deleteOne({ "_id": id }, function (err) {
                if (err)
                    reject({msg: "Error on delete State", error: err})
                else
                    resolve()
            });
        });
    }
}

module.exports = () => new StateRepository();