const mongoose = require("mongoose");
const {check} = require("express-validator");

const cidade = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Atributo 'Nome' é obrigatório!"],
        unique: true,
        dropDups: true
    },
    estadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estados",
        required: [true, "Atributo 'Estado' é obrigatório!"]
    },
    dataCriacao: {
        type: Date,
        require: true
    },
    dataUltAlt: {
        type: Date,
        require: false
    }
});

module.exports = {
    model: mongoose.model("Cidades", cidade),
    schema: cidade,
    validation: [
        check("nome")
            .not().isEmpty().withMessage("Nome não pode ser vazio")
            .isLength({min: 5}).withMessage("Nome deve ter no mínimo 5 caracteres"),

        check("estadoId")
            .not().isEmpty().withMessage("Estado não pode ser vazio")
    ]
};