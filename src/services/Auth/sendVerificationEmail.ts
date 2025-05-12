import { Resend } from 'resend';
import { config } from '../../config/email';


const resend = new Resend(config.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
    const verificationUrl = `${config.FRONTEND_URL}/verificar-correo?token=${verificationToken}`;

    try {
        await resend.emails.send({
            from: 'Tesoros de la India <onboarding@resend.dev>',
            to: email,
            subject: 'Verifica tu cuenta',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4F46E5;">¡Bienvenido a Tesoros de la India!</h1>
                    <p>Por favor verifica tu dirección de email para activar tu cuenta:</p>
                    <a href="${verificationUrl}" 
                    style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">
                    Verificar Email
                    </a>
                    <p style="margin-top: 20px;">Si no solicitaste este registro, puedes ignorar este mensaje.</p>
                    <p style="font-size: 12px; color: #666;">Este enlace expirará en 24 horas.</p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error enviando email de verificación:', error);
        throw new Error('No se pudo enviar el email de verificación');
    }
};
