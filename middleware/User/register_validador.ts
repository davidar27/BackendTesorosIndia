import { NextFunction, Request, Response } from "express";
import { check } from "express-validator/lib/middlewares/validation-chain-builders";
import { validationResult } from "express-validator/lib/validation-result";

let validatorParam = [
    check('first_name').isLength({ min: 1, max: 50 }),
    check('last_name').isLength({ min: 1, max: 50 }),
    check('email').isLength({ min: 1, max: 100 }),
    check('phone_number').isLength({ min: 10, max: 10 }),
    check('password').isLength({ min: 8, max: 32 })
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/),

    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('!LA CONTRASEÑA INGRESADA NO COINCIDE CON LA ANTERIOR¡')
        } return true
    })

];

function validator(req: Request, res: Response, next: NextFunction): any {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export default {
    validatorParam,
    validator
};