"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(code, message, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
    static handle(error, res) {
        res.status(error.statusCode).json({
            error: {
                code: error.code,
                message: error.message,
            },
        });
    }
}
exports.ApplicationError = ApplicationError;
