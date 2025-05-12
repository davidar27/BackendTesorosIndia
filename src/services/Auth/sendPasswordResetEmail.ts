import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { config } from '../../config/email';

const brevoApi = new TransactionalEmailsApi();
brevoApi.setApiKey(0, config.BREVO_API_KEY);

export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
    const resetUrl = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const emailData: SendSmtpEmail = {
        sender: {
            email: 'onboarding@tesorosdelaindia.brevo.com', 
            name: 'Tesoros de la India'
        },
        to: [{ email }],
        subject: 'Restablece tu contraseña',
        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #4F46E5;">Restablecer contraseña</h1>
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetUrl}" 
                style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">
                Restablecer contraseña
                </a>
                <p style="margin-top: 20px;">Si no solicitaste este cambio, ignora este mensaje.</p>
            </div>
        `
    };

    try {
        await brevoApi.sendTransacEmail(emailData);
    } catch (error) {
        console.error('Error enviando email de restablecimiento:', error);
        throw new Error('No se pudo enviar el email de restablecimiento');
    }
};