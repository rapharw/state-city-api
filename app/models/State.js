const mongoose = require("mongoose");
const {check} = require("express-validator");

const state = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Attribute 'name' is required!"],
        unique: true,
        dropDups: true
    },
    shortName: {
        type: String,
        required: [true, "Attribute 'shortName' is required!"],
        unique: true
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
    model: mongoose.model("states", state),
    schema: state,
    validation: [
        check("name")
            .not().isEmpty().withMessage("Name cannot be empty")
            .isLength({min: 5}).withMessage("Name must have a minimal 5 letters"),

        check("shortName")
            .not().isEmpty().withMessage("ShortName cannot be empty")
            .isLength({min: 2, max: 2}).withMessage("ShortName must have 2 letters")
    ]
};