const config = {
    db_user: process.env.MONGO_USER,
    db_password: process.env.MONGO_PASS,
    db_host: process.env.MONGO_HOST,
    db_name: process.env.MONGO_NAME
};
module.exports = config;