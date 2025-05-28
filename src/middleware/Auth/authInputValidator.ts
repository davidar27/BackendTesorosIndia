import { check } from "express-validator/lib/middlewares/validation-chain-builders";
import { validationResult } from "express-validator/lib/validation-result";
import { NextFunction, Request, Response } from "express";

let validatorParams = [
    check('email')
        .isLength({ max: 100 })
        .isEmail(),

    check('password')
        .isLength({ min: 8, max: 32 })
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/),
];

function validator(req: Request, res: Response, next: NextFunction): any {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ error: errors.array() });
    }
    next();
}

export default {
    validatorParams,
    validator
};