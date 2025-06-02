import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { config } from '@/config/email';

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey(0, config.BREVO_API_KEY || '');




function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
    if (!email || !isValidEmail(email)) {
        throw new Error(`Email inválido: ${email}`);
    }

    if (!token) {
        throw new Error('Token de verificación no proporcionado');
    }

    const verificationUrl = `${config.FRONTEND_URL}/auth/verificacion/correo?token=${token}`;

    const emailData: SendSmtpEmail = {
        sender: {
            email: 'tesorosindia692@gmail.com',
            name: 'Tesoros de la India'
        },
        to: [{
            email: email.trim(),
        }],
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
        await apiInstance.sendTransacEmail(emailData);
    } catch (error: any) {
        console.error('❌ Error detallado al enviar email:', {
            message: error.message,
            response: error.response?.text,
            status: error.response?.status,
            body: error.response?.body,
            error: error
        });
        
        if (error.response?.statusCode === 401) {
            throw new Error('Error de autenticación con Brevo. Verifica tu API key.');
        } else if (error.response?.statusCode === 429) {
            throw new Error('Se ha excedido el límite de envío de correos en Brevo.');
        } else if (error.response?.body?.code === 'invalid_parameter') {
            throw new Error(`Error de parámetro inválido: ${error.response.body.message}`);
        } else if (error.code === 'ECONNREFUSED') {
            throw new Error('No se pudo conectar con el servicio de Brevo. Verifica tu conexión a internet.');
        } else if (error.code === 'ETIMEDOUT') {
            throw new Error('La conexión con Brevo ha expirado. Intenta nuevamente.');
        } else {
            throw new Error(`Error al enviar email: ${error.message || 'Error desconocido'}`);
        }
    }
};