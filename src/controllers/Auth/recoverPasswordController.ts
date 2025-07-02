import { generatePasswordResetToken } from '@/helpers/Tokens/generatePasswordResetToken';
import { sendPasswordResetEmail } from '@/services/Auth/sendPasswordResetEmail';
import { findByEmailUserService } from '@/services/User/findByEmailUserService';
import { Request, Response } from 'express';


export const recoverPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;


        const user = await findByEmailUserService(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado, puedes registrarte dando click en el boton de "¿No tienes una cuenta?"' });
        }

        const resetToken = generatePasswordResetToken(user.userId as number, user.email as string);

        await sendPasswordResetEmail(email, resetToken);

        return res.json({
            message: 'Se ha enviado un email con instrucciones para restablecer tu contraseña'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al procesar la solicitud',
            details: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};