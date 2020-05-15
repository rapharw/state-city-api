const mongoose = require("mongoose");
const {check} = require("express-validator");

const city = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Attribute 'name' is required!"],
        unique: true,
        dropDups: true
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "states",
        required: [true, "Attribute 'State' is required!"]
    },
    dateCreated: {
        type: Date,
        require: true
    },
    dateLastUpdated: {
        type: Date,
        require: false
    }
});

module.exports = {
    model: mongoose.model("cities", city),
    schema: city,
    validation: [
        check("name")
            .not().isEmpty().withMessage("Name cannot be empty")
            .isLength({min: 5}).withMessage("Name must have a minimal 5 letters"),

        check("stateId")
            .not().isEmpty().withMessage("State cannot be empty")
    ]
};