import { Request, Response } from 'express';
import { verifyToken } from '../../helpers/Tokens/verifyToken';
import { VERIFICATION_TOKEN_SECRET } from '../../helpers/Tokens/TokenSecrets';

export const verifyTokenController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ error: 'Token de verificación requerido' });
        }

        verifyToken(token as string, VERIFICATION_TOKEN_SECRET);

        return res.status(200).json({ message: 'Token verificado exitosamente' });
    } catch (err) {
        const error = err as Error;

        if (error.message.includes('expirado')) {
            return res.status(400).json({ error: 'El enlace de verificación ha expirado' });
        }

        if (error.message.includes('inválido')) {
            return res.status(400).json({ error: 'Token de verificación inválido' });
        }

        return res.status(500).json({ error: 'Error al verificar el Token' });
    }
};
