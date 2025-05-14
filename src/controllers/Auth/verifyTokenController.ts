import { Request, Response } from 'express';
import { verifyToken } from '../../helpers/Tokens/verifyToken';
import { ACCESS_TOKEN_SECRET } from '../../helpers/Tokens/TokenSecrets';
import { TokenPayload } from '../../models/Auth/Auth';

interface VerificationResponse {
    success: boolean;
    message?: string;
    payload?: TokenPayload;
    error?: string;
}

export const verifyTokenController = async (
    req: Request,
    res: Response<VerificationResponse>
): Promise<Response> => {
    try {
        const token = req.cookies.access_token;


        if (!token || typeof token !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Token de verificación requerido'
            });
        }

        const payload = verifyToken<TokenPayload>(token, ACCESS_TOKEN_SECRET);

        return res.status(200).json({
            success: true,
            message: 'Token verificado exitosamente',
            payload
        });

    } catch (err) {
        const error = err as Error;

        if (error.message.includes('expirado')) {
            return res.status(401).json({
                success: false,
                error: 'Token expirado',
                message: 'Por favor, genere un nuevo token'
            });
        }

        if (error.message.includes('inválido')) {
            return res.status(401).json({
                success: false,
                error: 'Token inválido',
                message: 'El token proporcionado no es válido'
            });
        }

        // Error inesperado
        console.error('Error verifying token:', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno al verificar el token'
        });
    }
};