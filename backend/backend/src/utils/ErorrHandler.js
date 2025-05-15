class ErrorHandler extends Error {
    constructor(message,statusCode) {
        super(); //this will call constructor of parent class => error
        this.message = message;
        this.statusCode = statusCode;

}
}

module.exports = ErrorHandler;