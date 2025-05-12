import EmailService from '../../services/Auth/emailService';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Buscar usuario
        const user = await findByEmailUserService(email);
        if (!user) {
            return res.status(404).json({ error: 'No existe usuario con este email' });
        }

        // Enviar email de recuperación
        await EmailService.sendPasswordResetEmail(email, user.id);

        return res.json({
            message: 'Se ha enviado un email con instrucciones para restablecer tu contraseña'
        });
    } catch (error) {
        console.error("Error en forgotPasswordController:", error);
        return res.status(500).json({
            error: 'Error al procesar la solicitud',
            details: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};