"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
var validation_result_1 = require("express-validator/lib/validation-result");
var validatorParams = [
    (0, validation_chain_builders_1.check)('email')
        .isLength({ max: 100 })
        .isEmail(),
    (0, validation_chain_builders_1.check)('password')
        .isLength({ min: 8, max: 32 })
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/),
];
function validator(req, res, next) {
    var errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    next();
}
exports.default = {
    validatorParams: validatorParams,
    validator: validator
};
