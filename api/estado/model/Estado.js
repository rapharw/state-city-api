const mongoose = require("mongoose");
const {check} = require("express-validator");

const estado = {
    nome: {
        type: String,
        required: [true, "Atributo 'Nome' é obrigatório!"],
        unique: true,
        dropDups: true
    },
    abreviacao: {
        type: String,
        required: [true, "Atributo 'Abreviação' é obrigatório!"],
        unique: true
    },
    dataCriacao: {
        type: Date,
        require: true
    },
    dataUltAlt: {
        type: Date,
        require: false
    }
};
module.exports = {
    model: mongoose.model("Estados", estado),
    validation: [
        check("nome")
            .not().isEmpty().withMessage("Nome não pode ser vazio")
            .isLength({min: 5}).withMessage("Nome deve ter no mínimo 5 caracteres"),

        check("abreviacao")
            .not().isEmpty().withMessage("Abreviação não pode ser vazia")
            .isLength({min: 2, max: 2}).withMessage("Abreviação deve ter 2 caracteres")
    ]
};