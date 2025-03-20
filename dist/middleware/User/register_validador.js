"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
var validation_result_1 = require("express-validator/lib/validation-result");
var validatorParam = [
    (0, validation_chain_builders_1.check)('first_name').isLength({ min: 1, max: 50 }),
    (0, validation_chain_builders_1.check)('last_name').isLength({ min: 1, max: 50 }),
    (0, validation_chain_builders_1.check)('email').isLength({ min: 1, max: 100 }),
    (0, validation_chain_builders_1.check)('phone_number').isLength({ min: 10, max: 10 }),
    (0, validation_chain_builders_1.check)('password').isLength({ min: 8, max: 32 })
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/),
    (0, validation_chain_builders_1.check)('confirm_password').custom(function (value, _a) {
        var req = _a.req;
        if (value !== req.body.password) {
            throw new Error('!LA CONTRASEÑA INGRESADA NO COINCIDE CON LA ANTERIOR¡');
        }
        return true;
    })
];
function validator(req, res, next) {
    var errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
exports.default = {
    validatorParam: validatorParam,
    validator: validator
};
