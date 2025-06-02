import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { config } from '@/config/email';

const brevoApi = new TransactionalEmailsApi();
brevoApi.setApiKey(0, config.BREVO_API_KEY as string);

export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
    const resetUrl = `${config.FRONTEND_URL}/auth/password/restablecer?token=${resetToken}`;

    const emailData: SendSmtpEmail = {
        sender: {
            email: 'tesorosindia692@gmail.com',
            name: 'Tesoros de la India'
        },
        to: [{ email }],
        subject: 'Restablece tu contraseña',
        htmlContent: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 25px;">
                <img src="https://i.postimg.cc/YSQp2Kmn/logotesorosindia.png" alt="Tesoros de la India" style="max-width: 180px;"/>
            </div>
            
            <h1 style="color: #00a63d; font-size: 24px; text-align: center; margin-bottom: 20px;">
                Restablece tu contraseña
            </h1>
            
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                Estás a un paso de restablecer tu contraseña. Por favor haz clic en el botón a continuación:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="display: inline-block; padding: 14px 28px; background-color: #00a63d; color: white; 
                          text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;
                          box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    Restablecer contraseña
                </a>
            </div>
            
            <p style="color: #666666; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                Si no has creado una cuenta en Tesoros de la India, por favor ignora este mensaje.
            </p>
            
            <div style="border-top: 1px solid #eaeaea; padding-top: 20px; text-align: center;">
                <p style="color: #999999; font-size: 12px;">
                    © ${new Date().getFullYear()} Tesoros de la India. Todos los derechos reservados.
                </p>
                <p style="color: #999999; font-size: 12px;">
                    Si tienes problemas con el botón, copia y pega esta URL en tu navegador:<br>
                    <a href="${resetUrl}" style="color: #4F46E5; word-break: break-all;">${resetUrl}</a>
                </p>
            </div>
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