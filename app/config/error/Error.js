class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
const handleError = (err, res) => {
    const { statusCode, message } = err;
    let statusCodeAux = statusCode;
    if(!statusCodeAux){
        statusCodeAux = 500;
    }
    res.status(statusCodeAux).json({status: "error", statusCodeAux, message});
};
module.exports = {
    ErrorHandler,
    handleError
};