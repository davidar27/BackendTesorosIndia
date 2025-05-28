import { Request, Response } from 'express';
import { sendVerificationEmail } from '../../services/Auth/sendVerificationEmail';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';
import { UserRole } from '../../models/Auth/Auth';
import { generateVerificationToken } from '../../helpers/Tokens/generateVerificationToken';

export const resendVerificationEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await findByEmailUserService(email);        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.verified) {
            return res.status(400).json({ message: 'La cuenta ya está verificada' });
        }
        const verificationToken = generateVerificationToken(user.id as number, user.role as UserRole);
        await sendVerificationEmail(user.email, verificationToken);

        res.json({ message: 'Email de verificación reenviado' });
    } catch (error) {
        console.error('Error al reenviar email:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};