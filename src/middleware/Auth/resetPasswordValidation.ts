import { NextFunction, Request, Response } from "express";
import { check, query } from "express-validator/lib/middlewares/validation-chain-builders";
import { validationResult } from "express-validator/lib/validation-result";



export const validatorParam = [
    check('password').isLength({ min: 8, max: 32 })
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
    .withMessage('La contraseña debe tener entre 8 y 32 caracteres y puede incluir caracteres especiales'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('La contraseña de confirmación no coincide');
        }
        return true;
    }),
    query('token')
        .notEmpty()
        .withMessage('El token de restablecimiento es requerido'),
]



const validator = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
        return;
    }
    next();
};

export default {
    validatorParam,
    validator
};