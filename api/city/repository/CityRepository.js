const MongoConnection = require("../../../database/MongoConnection");

const City = require("../model/City").model;

class CityRepository extends MongoConnection {

    constructor(){
        super()
    }


    findAll(){

        return new Promise(function(resolve, reject){


            City.find({})
                .populate("stateId")
                .exec(function(error, posts) {
                    if(error){
                        reject({msg: "Error on get List of Cities", error: error});
                    }
                    resolve(posts);
                });

        });
    }


    findById(id){

        return new Promise(function(resolve, reject){

            City.findOne({_id: id})
                .populate("stateId")
                .exec(function(error, posts) {
                    if(error){
                        reject({msg: "City not found", error: error});
                    }
                    resolve(posts);
                });

        })
    }

    save(toSave){
        return new Promise(function(resolve, reject){

            toSave.dateCreated = new Date();
            toSave.dateLastUpdated = new Date();
            const city = new City(toSave);

            city.save()
                .then(result => {
                        resolve(result);
                    }
                    ,error => {
                        if(error.code === 11000){
                            reject({msg: "City is already exist", error: error})
                        }
                        else
                            reject({msg: "Error on save City", error: error})
                    });
        });
    }

    edit(id, toEdit){
        return new Promise(function(resolve, reject){

            toEdit.dateLastUpdated = new Date();

            City.findOneAndUpdate({ "_id": id }, { "$set": toEdit}).exec(function(err, city){
                if(err) {
                    reject({msg: "Error on edit city", error: err})
                } else {
                    resolve(city);
                }
            });
        });
    }


    delete(id){
        return new Promise(function(resolve, reject){
            City.deleteOne({ "_id": id }, function (err) {
                if (err)
                    reject({msg: "Error on delete city", error: err})
                else
                    resolve()
            });
        });
    }
}

module.exports = () => new CityRepository();