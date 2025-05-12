import { verifyEmailVerificationToken } from "../../helpers/Tokens/verifyVerificationToken";
import { verifyEmailService } from "../../services/Auth/verifyEmailService";
import { Request, Response } from 'express';



export const verifyEmailController = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        

        if (!token) {
            return res.status(400).json({ error: 'Token de verificación requerido' });
        }

        const { userId } = verifyEmailVerificationToken(token as string);
        
        await verifyEmailService(userId);

        return res.json({ message: 'Email verificado exitosamente' });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('expirado')) {
                return res.status(400).json({ error: 'El enlace de verificación ha expirado' });
            }
            if (error.message.includes('inválido')) {
                return res.status(400).json({ error: 'Token de verificación inválido' });
            }
        }

        return res.status(500).json({ error: 'Error al verificar el email' });
    }
};