import { Request, Response } from 'express';
import { User } from '@/models/User/User';
import { createEntrepreneurService } from '@/services/Dashboard/entrepreneur/createEntrepreneurService';
import { sendVerificationEmail } from '@/services/Auth/sendVerificationEmail';
import { generateVerificationToken } from '@/helpers/Tokens/generateVerificationToken';

export const createEntrepreneursController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone, name_farm } = req.body;

        if (!name || !email || !password || !phone || !name_farm) {
            res.status(400).json({ 
                error: 'Faltan campos requeridos (nombre, email, contraseña, teléfono, nombre de granja)' 
            });
            return;
        }

        const userData = User.createEntrepreneur({
            name,
            email,
            password,
            phone,
            name_farm
        });

        const entrepreneurData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            name_farm,
        };

        const newUser: User = await createEntrepreneurService(entrepreneurData);
        let responsePayload: any = {
            message: 'Emprendedor creado exitosamente',
            user: newUser
        };
        let statusCode = 201;

        if (typeof newUser.userId === 'number') {
            // @ts-ignore: UserRole está bien tipado
            const verificationToken = generateVerificationToken(newUser.userId, newUser.role);
            try {
                await sendVerificationEmail(newUser.email, verificationToken);
            } catch (emailError) {
                responsePayload = {
                    message: 'Emprendedor registrado pero hubo un problema al enviar el email de verificación.',
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
        if (error.message === 'El correo electrónico ya está registrado') {
            res.status(409).json({
                message: 'El correo electrónico ya está registrado',
            });
        } else {
            res.status(500).json({
                error: error.message || 'Error al crear el emprendedor' 
            });
        }
    }
};
