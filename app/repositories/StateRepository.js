const MongoConnection = require("../database/MongoConnection");
const State = require("../models/State").model;

class StateRepository extends MongoConnection{

    constructor(){
        super();
    }

    async findAll(){
        return new Promise(function(resolve, reject){
            let errorMsg = "Error on get List of States";
            try{
                State.find()
                    .then((result) => resolve(result))
                    .catch((e) => reject({msg: errorMsg, error: e}));
            }
            catch (e) {
                reject({msg: errorMsg, error: e});
            }

        });
    }


    async findById(id){
        return new Promise(function(resolve, reject){
            let errorMsg = "State not found";
            try{
                State.find({_id:id})
                    .then(result => {
                        if(result.length === 0)
                            resolve({result});
                        else
                            resolve(result[0])
                    })
                    .catch((e) => reject({msg: errorMsg, error: e}));
            }
            catch (e) {
                reject({msg: errorMsg, error: e});
            }

        })
    }


    async save(toSave){
        return new Promise(function(resolve, reject){
            let errorMsg = "Error on save State";
            try{
                toSave.dateCreated = Date.now();
                toSave.dateLastUpdated = Date.now();

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
                                reject({msg: errorMsg, error: error})
                        });
            }
            catch (e) {
                reject({msg: errorMsg, error: e});
            }
        });
    }


    async edit(id, toEdit){
        return new Promise(function(resolve, reject){
            let errorMsg = "Error on edit State";
            try{
                toEdit.dateLastUpdated = Date.now();
                State.findOneAndUpdate({ "_id": id }, { "$set": toEdit}).exec(function(err, state){
                    if(err) {
                        reject({msg: errorMsg, error: err})
                    } else {
                        resolve(state);
                    }
                });
            }
            catch (e) {
                reject({msg: errorMsg, error: e});
            }
        });
    }


    async delete(id){
        return new Promise(function(resolve, reject){
            let errorMsg = "Error on delete State";
            try{
                State.deleteOne({ "_id": id }, function (err) {
                    if (err)
                        reject({msg: errorMsg, error: err})
                    else
                        resolve()
                });
            }
            catch (e) {
                reject({msg: errorMsg, error: e});
            }
        });
    }
}

module.exports = () => StateRepository;