import { findUserByIdRepository } from "@/repositories/User/findUserByIdRepository";
import { generateToken } from "../Tokens/generateToken";
import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';
import { Reserve } from "@/models/Reserve/Reserve";
import { getInfoReserveRepository } from "@/repositories/Reserve/getInfoReserveRepository";

export const getContentReserveNotification = async (role: 'entrepreneur' | 'client', type: 'Cancelación' | 'Reembolso' | 'Reserva', reserve: Reserve, entrepreneur: any): Promise<string> => {
    const BACKEND_URL = process.env.BACKEND_URL
    const cancelRoute = `${BACKEND_URL}/reservas/cancelar`;
    const infoReserve = await getInfoReserveRepository(reserve.room_id as number)
    const user: any = await findUserByIdRepository(reserve.user_id as number);
    const payload = createTokenPayload({ userId: user?.userId as number, email: user?.email, experience_id: user?.experience_id, image: user?.image, name: user?.name, role: user?.role }, user.token_version);
    const userToken = generateToken(payload, ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION.VERIFICATION);

    const getContent = () => {
        if (role === 'entrepreneur' && type === 'Reserva') {
            return {
                title: 'Nueva Reserva de Habitacion',
                message: `Tienes una nueva reserva de habitacion.`,
                showCancel: false
            };
        } else if (role === 'client' && type === 'Reserva') {
            return {
                title: 'Confirmación de Reserva',
                message: `Tu reserva de habitación ha sido procesada exitosamente. Si necesitas cancelar tu reserva, puedes hacerlo utilizando el botón de abajo.`,
                showCancel: true
            };
        }
    };

    const content: any = getContent();

    return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 25px;">
                <img src="https://i.postimg.cc/YSQp2Kmn/logotesorosindia.png" alt="Tesoros de la India" style="max-width: 180px;"/>
            </div>
            
            <h1 style="color: #00a63d; font-size: 24px; text-align: center; margin-bottom: 20px;">
                ${content.title}
            </h1>
            
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
                <strong>Estimado ${role === 'entrepreneur' ? 'Emprendedor' : 'Cliente'},</strong>
            </p>
            
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                ${content.message}
            </p>
            
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                <strong>Informacion de la reserva:</strong>
                Nombre del Hostal Reservado: ${infoReserve.hostel_name}
                Nombre de la Habitacion Reservada: ${infoReserve.room_name}
                Cantidad maxima de personas para la habitacion: ${infoReserve.max_people}
                Precio total de la reserva: ${infoReserve}
                Fecha de la reserva: ${reserve.reserve_date}
            </p>
            
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                <strong>Informacion del Emprendedor:</strong>
                Nombre del emprendedor: ${entrepreneur.name}
                Correo del emprendedor: ${entrepreneur.email}
                Numero del emprendedor: ${entrepreneur.phone}
            </p>

            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                <strong>Informacion del Cliente:</strong>
                Nombre del cliente: ${user.name}
                Correo del cliente: ${user.email}
                Numero del cliente: ${user.phone}
            </p>
            
            ${content.showCancel ? `
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${cancelRoute}?token=${userToken}&reserve_id=${reserve.reserve_id}" 
                    style="display: inline-block; padding: 14px 28px; background-color: #dc3545; color: white; 
                            text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 0 10px 10px 0;">
                        ✗ Cancelar Reserva
                        </a>
                </div>
            ` : ''}
            
            <p style="color: #666666; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                ${role === 'entrepreneur'
            ? ''
            : 'Si tienes alguna pregunta sobre tu reserva o necesitas asistencia, no dudes en contactarnos. Recuerda rechazar la reserva en un tiempo prudente'}
            </p>
            
            <div style="border-top: 1px solid #eaeaea; padding-top: 20px; text-align: center;">
                <p style="color: #999999; font-size: 12px;">
                    © ${new Date().getFullYear()} Tesoros de la India. Todos los derechos reservados.
                </p>
                <p style="color: #999999; font-size: 12px; margin-top: 10px;">
                    Este es un mensaje automático, por favor no respondas a este correo.
                </p>
            </div>
        </div>
        `;
}