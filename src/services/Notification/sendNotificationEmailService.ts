import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { config } from '@/config/email';
import { NotificationModel } from '@/models/Notification/notification';

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey(0, config.BREVO_API_KEY || '');

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const sendNotificationEmailService = async (email: string, notification: NotificationModel): Promise<void> => {
    if (!email || !isValidEmail(email)) {
        throw new Error(`Email inválido: ${email}`);
    }
    const emailData: SendSmtpEmail = {
        sender: {
            email: 'tesorosindia692@gmail.com',
            name: 'Tesoros de la India'
        },
        to: [{
            email: email.trim(),
        }],
        subject: notification.type,
        htmlContent: notification.message
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