import { Request, Response } from 'express';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';
import updateUserPasswordService from '../../services/Auth/updateUserPasswordService';
import { verifyTokenPayload } from '../../helpers/Tokens/verifyTokenPayload';
import { PASSWORD_RESET_SECRET } from '../../helpers/Tokens/TokenSecrets';
import { TokenPayload } from '../../models/Auth/Auth';

interface ResetPasswordPayload extends TokenPayload {
    purpose: 'password_reset';
}


export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;
        const { password } = req.body;
        
        const payload = verifyTokenPayload<ResetPasswordPayload>(token, PASSWORD_RESET_SECRET);
        

        if (!payload.userId || payload.purpose !== 'password_reset') {
            return res.status(400).json({
                success: false,
                message: 'Token de restablecimiento inválido'
            });
        }
        const user = await findByEmailUserService(payload.email as string);
        if (!user) {
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

