import { Request, Response } from 'express';
import { findByEmailUserService } from '@/services/User/findByEmailUserService';
import updateUserPasswordService from '@/services/Auth/updateUserPasswordService';
import { verifyTokenPayload } from '@/helpers/Tokens/verifyTokenPayload';
import { PASSWORD_RESET_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { TokenPayload } from '@/models/Auth/Auth';

type PasswordResetToken = TokenPayload & {
    purpose: 'password_reset';
};

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;
        const { password } = req.body;

        console.log("token", token);

        const data = verifyTokenPayload<PasswordResetToken>(
            token,
            PASSWORD_RESET_SECRET,
            { requirePurpose: 'password_reset' }
        );

        if (!data.data.userId) {
            return res.status(400).json({
                success: false,
                message: 'Token de restablecimiento inválido'
            });
        }
        const user = await findByEmailUserService(data.data.email as string);
        if (!user || 'errorType' in user) {
            return res.status(400).json({
                success: false,
                message: 'Token de restablecimiento inválido'
            });
        }
        await updateUserPasswordService(user.email, password);
        return res.status(200).json({
            success: true,
            message: 'Contraseña actualizada correctamente'
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('expirado')) {
            return res.status(400).json({
                success: false,
                message: 'El enlace de restablecimiento ha expirado'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Error al restablecer la contraseña'
        });
    }
}

