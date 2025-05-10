import { NextFunction, Request, Response } from "express";
import { check } from "express-validator/lib/middlewares/validation-chain-builders";
import { validationResult } from "express-validator/lib/validation-result";

const validatorParam = [
    check('name').isLength({ min: 1, max: 100 }).withMessage('El nombre debe tener entre 1 y 50 caracteres'),
    check('email').isEmail().withMessage('El correo electrónico no es válido'),
    check('phone_number').isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 caracteres'),
    check('password').isLength({ min: 8, max: 32 })
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
        .withMessage('La contraseña debe tener entre 8 y 32 caracteres y puede incluir caracteres especiales'),
    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('La contraseña de confirmación no coincide');
        }
        return true;
    })
];

const validator = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
};

export default {
    validatorParam,
    validator
};