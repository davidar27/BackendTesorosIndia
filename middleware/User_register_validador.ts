import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

let validatorParam = [
    check('Nombres').isLength({ min: 1, max: 50 }),
    check('Apellidos').isLength({ min: 1, max: 50 }),
    check('Correo Electronico').isLength({ min: 1, max: 100 }),
    check('Numero de telefono').isLength({min:10, max: 10}),
    check('Contraseña').isLength({ min: 8, max: 32 }),
    check('Confirmar Contraseña').custom((value, { req }) => {
        if (value !== req.body.password_hash) {
            throw new Error('!LA CONTRASEÑA INGRESADA NO COINCIDE CON LA ANTERIOR¡')
        }return true
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