import { Request, Response } from 'express';
import { registerUserService } from '../../services/User/registerUserService';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';
import { generateVerificationToken } from '../../helpers/Tokens/generateVerificationToken';
import { UserRole } from '../../models/Auth/Auth';
import { sendVerificationEmail } from '../../services/Auth/sendVerificationEmail';

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { name, email, phone_number, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const existingUser = await findByEmailUserService(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const newUser = await registerUserService({ id : NaN, name, email, phone_number, password });

        if (newUser.id === undefined || newUser.role === undefined) {
            throw new Error('User ID or role is undefined');
        }

        const verificationToken = generateVerificationToken(newUser.id, newUser.role as UserRole);

        await sendVerificationEmail(newUser.email,  verificationToken);

        return res.status(201).json({
            message: 'Registro exitoso. Por favor verifica tu email.',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            }
        });
    } catch (error) {
        console.error("Error en createUserController:", error);
        return res.status(500).json({
            error: 'Error al registrar usuario',
            details: error instanceof Error ? error.message : error
        });
    }
};
