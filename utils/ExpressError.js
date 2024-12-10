class ExpressError extends Error {
    constructor(ststusCode, message) {
        super();
        //this.statusCode = statusCode;
        this.message=message;
    }
}

module.exports = ExpressError;