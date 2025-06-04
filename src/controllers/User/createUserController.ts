import { Request, Response } from 'express';
import { User, UserRole } from '@/models/User/User';
import { createClientService } from '@/services/User/createClientService';
import { generateVerificationToken } from '@/helpers/Tokens/generateVerificationToken'
import { sendVerificationEmail } from '@/services/Auth/sendVerificationEmail';

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            res.status(400).json({ 
                error: 'Faltan campos requeridos (nombre, email, contraseña, teléfono)' 
            });
            return;
        }

        const userData = User.createClient({
            name,
            email,
            password,
            phone
        });

        const newUser = await createClientService(userData);
        let responsePayload: any = {
            message: 'Usuario creado exitosamente',
            user: newUser
        };
        let statusCode = 201;

        if (typeof newUser.userId === 'number') {
            const verificationToken = generateVerificationToken(newUser.userId, newUser.role as UserRole);
            try {
                await sendVerificationEmail(newUser.email, verificationToken);
            } catch (emailError) {
                responsePayload = {
                    message: 'Usuario registrado pero hubo un problema al enviar el email de verificación.',
                    warning: 'No se pudo enviar el email de verificación. Por favor, intenta solicitar un nuevo email de verificación más tarde.',
                    user: {
                        userId: newUser.userId,
                        email: newUser.email,
                        name: newUser.name
                    }
                };
            }
        } else {
            statusCode = 500;
            responsePayload = { error: 'No se pudo generar el token de verificación: userId indefinido.' };
        }

        res.status(statusCode).json(responsePayload);
    } catch (error: any) {
        console.error('Error en createUserController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al crear el usuario' 
        });
    }
}; 