import { Resend } from 'resend';
import { config } from '../../config/email';
import { UserRole } from '../../models/Auth/Auth';
import { generatePasswordResetToken } from '../../helpers/Tokens/generatePasswordResetToken';

const resend = new Resend(config.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, userId: number, role: UserRole): Promise<void> => {
    const resetToken = generatePasswordResetToken(userId, role);
    const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;

    try {
        await resend.emails.send({
            from: 'Tesoros de la India <soporte@tudominio.com>',
            to: email,
            subject: 'Restablece tu contraseña',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F46E5;">Restablecimiento de contraseña</h2>
                    <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
                    <a href="${resetUrl}" 
                    style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">
                    Restablecer Contraseña
                    </a>
                    <p style="margin-top: 20px; font-size: 12px; color: #666;">
                        Si no solicitaste este cambio, por favor ignora este email o contacta a soporte.
                    </p>
                    <p style="font-size: 12px; color: #666;">Este enlace expirará en 1 hora.</p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error enviando email de recuperación:', error);
        throw new Error('No se pudo enviar el email de recuperación');
    }
};
