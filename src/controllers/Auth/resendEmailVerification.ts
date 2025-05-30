import { Request, Response } from 'express';
import { sendVerificationEmail } from '../../services/Auth/sendVerificationEmail';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';
import { UserRole } from '../../models/Auth/Auth';
import { generateVerificationToken } from '../../helpers/Tokens/generateVerificationToken';

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const resendVerificationEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                error: 'Email requerido',
                details: 'Debe proporcionar un email'
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                error: 'Email inválido',
                details: 'El formato del email no es válido'
            });
        }

        const user = await findByEmailUserService(email);

        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado',
                details: 'No se encontró un usuario con ese email'
            });
        }

        if (user.verified) {
            return res.status(400).json({
                status: 'error',
                error: 'Usuario ya verificado',
                details: 'Esta cuenta ya está verificada. Puede iniciar sesión normalmente.'
            });
        }

        if (!user.userId) {
            return res.status(500).json({
                status: 'error',
                error: 'Error en datos de usuario',
                details: 'Los datos del usuario están incompletos'
            });
        }

        const verificationToken = generateVerificationToken(user.userId, user.role as UserRole);
        
        await sendVerificationEmail(user.email, verificationToken);

        return res.json({
            message: 'Email de verificación reenviado',
            details: 'Por favor, revise su bandeja de entrada'
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: error instanceof Error ? error.message : 'Error al reenviar el email de verificación'
        });
    }
};