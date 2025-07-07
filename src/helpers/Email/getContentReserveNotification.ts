import { findUserByIdRepository } from "@/repositories/User/findUserByIdRepository";
import { generateToken } from "../Tokens/generateToken";
import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';
import { Reserve } from "@/models/Reserve/Reserve";
import { getInfoReserveRepository } from "@/repositories/Reserve/getInfoReserveRepository";

export const getContentReserveNotification = async (
    role: 'entrepreneur' | 'client',
    type: 'Cancelacion' | 'Reembolso' | 'Reserva',
    reserve: Reserve,
    entrepreneur: any
): Promise<string> => {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const cancelRoute = `${FRONTEND_URL}/cancelar/reserva`;
    const [infoReserve] = await getInfoReserveRepository(reserve.room_id as number);
    const user: any = await findUserByIdRepository(reserve.user_id as number);
    const payload = createTokenPayload(
        {
            userId: user?.userId as number,
            email: user?.email,
            experience_id: user?.experience_id,
            image: user?.image,
            name: user?.name,
            role: user?.role
        },
        user.token_version
    );
    const userToken = generateToken(payload, ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION.VERIFICATION);

    const getContent = () => {
        if (role === 'entrepreneur' && type === 'Reserva') {
            return {
                title: 'Nueva Reserva de Habitación',
                message: 'Tienes una nueva reserva de habitación en tu sistema.',
                showCancel: false,
                showRefund: false,
                showCancelation: false,
            };
        } else if (role === 'client' && type === 'Reserva') {
            return {
                title: 'Confirmación de Reserva',
                message: 'Tu reserva de habitación ha sido procesada correctamente. Si necesitas cancelarla, usa el botón al final de este mensaje.',
                showCancel: true,
                showRefund: false,
                showCancelation: false,
            };
        } else if (type === 'Cancelacion') {
            return {
                title: 'Reserva Cancelada',
                message: 'Has cancelado tu reserva exitosamente.',
                showCancel: false,
                showCancelation: true,
                showRefund: true,
            };
        }
    };

    const content: any = getContent();

    return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #eaeaea; border-radius: 8px; line-height: 1.6;">
        <!-- Encabezado -->
        <div style="text-align: center; margin: 0 0 20px 0;">
            <img src="https://i.postimg.cc/YSQp2Kmn/logotesorosindia.png" alt="Logo" style="max-width: 180px;"/>
        </div>
        
        <!-- Título principal -->
        <h1 style="color: #00a63d; font-size: 22px; text-align: center; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 1px solid #eee;">
            ${content.title}
        </h1>
        
        <!-- Mensaje principal -->
        <div style="margin: 0 0 20px 0;">
            <p style="margin: 0 0 10px 0;">Estimado ${role === 'entrepreneur' ? 'Emprendedor' : 'Cliente'},</p>
            <p style="margin: 0;">${content.message}</p>
        </div>
        
        <!-- Información de la reserva -->
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 0 0 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Información de la reserva:</h3>
            <p style="margin: 5px 0;">• Hostal: ${infoReserve.hostel_name}</p>
            <p style="margin: 5px 0;">• Habitación: ${infoReserve.room_name}</p>
            <p style="margin: 5px 0;">• Capacidad: ${infoReserve.max_people} personas</p>
            <p style="margin: 5px 0;">• Precio total: $${infoReserve.price} COP</p>
            <p style="margin: 5px 0;">• Fecha: ${reserve.reserve_date}</p>
        </div>
        
        <!-- Información del emprendedor -->
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 0 0 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Información del emprendedor:</h3>
            <p style="margin: 5px 0;">• Nombre: ${entrepreneur.name}</p>
            <p style="margin: 5px 0;">• Correo: ${entrepreneur.email}</p>
            <p style="margin: 5px 0;">• Teléfono: ${entrepreneur.phone}</p>
        </div>
        
        <!-- Información del cliente -->
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 0 0 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Información del cliente:</h3>
            <p style="margin: 5px 0;">• Nombre: ${user.name}</p>
            <p style="margin: 5px 0;">• Correo: ${user.email}</p>
            <p style="margin: 5px 0;">• Teléfono: ${user.phone}</p>
        </div>
        
        <!-- Botón de cancelación -->
        ${content.showCancel ? `
        <div style="text-align: center; margin: 25px 0 15px 0;">
            <a href="${cancelRoute}?token=${userToken}&reserve_id=${reserve.reserve_id}" 
               style="display: inline-block; padding: 12px 25px; background-color: #dc3545; color: white; 
               text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px;">
               ✗ Cancelar reserva
            </a>
            <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">
                Tienes 24 horas para cancelar. Se reembolsará el 20% del valor.
            </p>
        </div>
        ` : ''}
        
        <!-- Sección de cancelación -->
        ${content.showCancelation ? `
        <div style="background-color: #fff8f8; padding: 15px; border-radius: 6px; margin: 0 0 20px 0; border: 1px solid #ffdddd;">
            <h3 style="margin: 0 0 10px 0; color: #dc3545; font-size: 16px;">Reserva cancelada</h3>
            <p style="margin: 0;">La reserva ha sido cancelada exitosamente.</p>
        </div>
        ` : ''}
        
        <!-- Reembolso -->
        ${content.showRefund ? `
        <div style="background-color: #f8fff8; padding: 15px; border-radius: 6px; margin: 0 0 20px 0; border: 1px solid #ddffdd;">
            <h3 style="margin: 0 0 10px 0; color: #28a745; font-size: 16px;">Reembolso procesado</h3>
            <p style="margin: 5px 0;">• Porcentaje reembolsado: 20%</p>
            <p style="margin: 5px 0;">• Valor reembolsado: $${(infoReserve.price * 0.2)} COP</p>
        </div>
        ` : ''}
        
        <!-- Pie de página -->
        <div style="border-top: 1px solid #eaeaea; padding-top: 15px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tesoros de la India. Todos los derechos reservados.</p>
            <p style="margin: 5px 0;">Este es un mensaje automático, por favor no responder.</p>
        </div>
    </div>
    `;
};