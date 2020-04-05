const mongoose = require("mongoose");

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
module.exports = mongoose.model("Estados", estado);