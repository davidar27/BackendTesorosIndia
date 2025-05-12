import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { config } from '../../config/email'

const brevoApi = new TransactionalEmailsApi();
brevoApi.setApiKey(0, config.BREVO_API_KEY);

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
    const verificationUrl = `${config.FRONTEND_URL}/verificar-correo?token=${token}`;

    const emailData: SendSmtpEmail = {
        sender: {
            email: 'tesorosindia692@gmail.com',
            name: 'Tesoros de la India'
        },
        to: [{ email }],
        subject: 'Verifica tu cuenta',
        htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">¡Bienvenido!</h1>
          <a href="${verificationUrl}" 
          style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">
          Verificar Email
          </a>
      </div>
    `
    };

    try {
        await brevoApi.sendTransacEmail(emailData);
    } catch (error) {
        console.error('Error enviando email:', error);
        throw new Error('No se pudo enviar el email de verificación');
    }
};