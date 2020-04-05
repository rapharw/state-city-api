const poolSize = "?poolSize=4";
const conn = require("../database/Config");

class MongoConnection {

    constructor() {
        const mongoose = require("mongoose");
        mongoose.connect(`mongodb://${conn.db_user}:${conn.db_password}@${conn.db_host}/${conn.db_name}${poolSize}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    }

}

module.exports = MongoConnection;