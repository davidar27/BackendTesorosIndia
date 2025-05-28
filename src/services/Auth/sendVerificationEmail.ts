import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { config } from '../../config/email';

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
        subject: 'Por favor verifica tu cuenta en Tesoros de la India',
        htmlContent: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 25px;">
                <img src="https://i.postimg.cc/YSQp2Kmn/logotesorosindia.png" alt="Tesoros de la India" style="max-width: 180px;"/>
            </div>
            
            <h1 style="color: #00a63d; font-size: 24px; text-align: center; margin-bottom: 20px;">
                ¡Gracias por registrarte!
            </h1>
            
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                Estás a un paso de comenzar a disfrutar de Tesoros de la India. Por favor verifica tu dirección de correo electrónico haciendo clic en el botón a continuación:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="display: inline-block; padding: 14px 28px; background-color: #00a63d; color: white; 
                          text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;
                          box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    Verificar mi correo
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
                    <a href="${verificationUrl}" style="color: #4F46E5; word-break: break-all;">${verificationUrl}</a>
                </p>
            </div>
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