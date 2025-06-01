import { Request, Response } from 'express';
import { registerUserService } from '@/services/User/registerUserService';
import { findByEmailUserService } from '@/services/User/findByEmailUserService';
import { generateVerificationToken } from '@/helpers/Tokens/generateVerificationToken';
import { UserRole } from '@/models/Auth/Auth';
import { sendVerificationEmail } from '@/services/Auth/sendVerificationEmail';

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserData(data: any): { isValid: boolean; error?: string } {
    if (!data.email || typeof data.email !== 'string') {
        return { isValid: false, error: 'El email es requerido y debe ser texto' };
    }
    if (!isValidEmail(data.email)) {
        return { isValid: false, error: 'El formato del email no es válido' };
    }
    if (!data.password || typeof data.password !== 'string') {
        return { isValid: false, error: 'La contraseña es requerida y debe ser texto' };
    }
    if (!data.name || typeof data.name !== 'string') {
        return { isValid: false, error: 'El nombre es requerido y debe ser texto' };
    }
    if (data.phone && typeof data.phone !== 'string') {
        return { isValid: false, error: 'El teléfono debe ser texto' };
    }
    return { isValid: true };
}

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password } = req.body;

        const validation = validateUserData({ name, email, phone, password });
        if (!validation.isValid) {
            return res.status(400).json({ 
                error: 'Datos inválidos',
                details: validation.error
            });
        }

        const existingUser = await findByEmailUserService(email);
        if (existingUser) {
            return res.status(409).json({ 
                error: 'Usuario ya existe',
                details: 'El correo electrónico ya está registrado'
            });
        }

        const newUser = await registerUserService({ 
            userId: NaN, 
            name: name.trim(), 
            email: email.trim().toLowerCase(), 
            phone: phone ? phone.trim() : '', 
            password, 
            verified: false, 
            role: 'cliente', 
            description: '', 
            token_version: 0 
        });

        if (!newUser || newUser.userId === undefined || newUser.role === undefined) {
            throw new Error('Error al crear usuario: datos incompletos');
        }

        const verificationToken = generateVerificationToken(newUser.userId, newUser.role as UserRole);

        try {
            await sendVerificationEmail(newUser.email, verificationToken);
        } catch (emailError) {
            return res.status(201).json({
                message: 'Usuario registrado pero hubo un problema al enviar el email de verificación.',
                warning: 'No se pudo enviar el email de verificación. Por favor, intenta solicitar un nuevo email de verificación más tarde.',
                user: {
                    userId: newUser.userId,
                    email: newUser.email,
                    name: newUser.name
                }
            });
        }

        return res.status(201).json({
            message: 'Registro exitoso. Por favor verifica tu email.',
            user: {
                userId: newUser.userId,
                email: newUser.email,
                name: newUser.name
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al registrar usuario',
            details: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
