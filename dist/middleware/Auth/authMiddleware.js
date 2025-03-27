"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
const validation_result_1 = require("express-validator/lib/validation-result");
let validatorParams = [
    (0, validation_chain_builders_1.check)('email')
        .isLength({ max: 100 })
        .isEmail(),
    (0, validation_chain_builders_1.check)('password')
        .isLength({ min: 8, max: 32 })
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/),
];
function validator(req, res, next) {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    next();
}
exports.default = {
    validatorParams,
    validator
};
