import { findUserByIdRepository } from "@/repositories/User/findUserByIdRepository";
import { generateToken } from "../Tokens/generateToken";
import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';
import { getBillByIDRepository } from "@/repositories/payment/getBillByIDRepository";
import { getItemsBillRepository } from "@/repositories/payment/getItemsBillRepository";
import { findProductEntrepreneurRepository } from "@/repositories/User/findProductEntrepreneurRepository";
import { getPackageExperiencesRepository } from "@/repositories/Package/getPackageExperiencesRepository";

export const getContentBuyNotification = async (role: 'entrepreneur' | 'client', type: 'Cancelacion' | 'Compra', bill_id: number, entrepreneur_id?: number): Promise<string> => {
    const FRONTEND_URL = process.env.FRONTEND_URL
    const cancelRoute = `${FRONTEND_URL}/cancelar/compra`;

    const [bill] = await getBillByIDRepository(bill_id)
    const itemsBill = await getItemsBillRepository(bill_id)
    const typeItem = itemsBill[0].type

    const user: any = await findUserByIdRepository(bill.user_id as number);
    const payload = createTokenPayload({ userId: user?.userId as number, email: user?.email, experience_id: user?.experience_id, image: user?.image, name: user?.name, role: user?.role }, user.token_version);
    const userToken = generateToken(payload, ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION.VERIFICATION);

    const getContent = () => {
        if (role === 'entrepreneur' && type === 'Compra') {
            return {
                title: `Nueva compra realizada`,
                message: `Tienes una nueva compra en tu sistema.`,
                showCancel: false,
                showRefund: false,
                showCancelation: false,
            };
        } else if (role === 'client' && type === 'Compra') {
            return {
                title: `Compra realizada con éxito`,
                message: `Tu compra ha sido procesada correctamente. Si necesitas cancelarla, usa el botón al final de este mensaje.`,
                showCancel: true,
                showRefund: false,
                showCancelation: false,
            };
        } else if (type === 'Cancelacion') {
            return {
                title: 'Compra cancelada',
                message: `Has cancelado tu compra exitosamente.`,
                showCancel: false,
                showCancelation: true,
                showRefund: true,
            };
        }
    };

    const content: any = getContent();
    let totalPrice = 0;

    // Procesamiento de ítems
    const infoBuy = await Promise.all(itemsBill.map(async (i: any) => {
        if (typeItem == "producto") {
            const entrepreneur = await findProductEntrepreneurRepository(i.item_id);
            if (role == "client") {
                totalPrice += (i.price * i.quantity);
                return `
                <div style="margin: 0 0 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px;">
                    <p style="margin: 5px 0;"><strong>Producto:</strong> ${i.name}</p>
                    <p style="margin: 5px 0;"><strong>Precio unitario:</strong> $${i.price} COP</p>
                    <p style="margin: 5px 0;"><strong>Cantidad:</strong> ${i.quantity}</p>
                    <p style="margin: 5px 0;"><strong>Subtotal:</strong> $${(i.price * i.quantity)} COP</p>
                    <p style="margin: 5px 0;"><strong>Emprendedor:</strong> ${entrepreneur?.name}</p>
                    <p style="margin: 5px 0;"><strong>Contacto:</strong> ${entrepreneur?.email} | ${entrepreneur?.phone}</p>
                </div>
                `;
            }
            if (entrepreneur_id == entrepreneur?.userId) {
                totalPrice += (i.price * i.quantity);
                return `
                <div style="margin: 0 0 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px;">
                    <p style="margin: 5px 0;"><strong>Producto:</strong> ${i.name}</p>
                    <p style="margin: 5px 0;"><strong>Precio unitario:</strong> $${i.price} COP</p>
                    <p style="margin: 5px 0;"><strong>Cantidad:</strong> ${i.quantity}</p>
                    <p style="margin: 5px 0;"><strong>Subtotal:</strong> $${(i.price * i.quantity)} COP</p>
                </div>
                `;
            }
        } else if (typeItem == "paquete") {
            const experiences = await getPackageExperiencesRepository(i.item_id);
            const expList = await Promise.all(experiences.map((e: any) => {
                if (role == "client" || entrepreneur_id == e.entrepreneur_id) {
                    return `<li style="margin: 0 0 5px 15px;">${e.name}</li>`;
                }
                return '';
            }));

            return `
            <div style="margin: 0 0 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px;">
                <p style="margin: 5px 0;"><strong>Paquete:</strong> ${i.name}</p>
                <p style="margin: 5px 0;"><strong>Duración:</strong> ${i.duration}</p>
                <p style="margin: 5px 0;"><strong>Precio:</strong> $${i.price} COP</p>
                <p style="margin: 10px 0 5px 0;"><strong>Experiencias incluidas:</strong></p>
                <ul style="margin: 0 0 0 15px; padding: 0;">
                    ${expList.join('')}
                </ul>
            </div>
            `;
        }
        return '';
    }));

    // Plantilla HTML mejorada
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
        
        <!-- Información del cliente -->
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 0 0 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Información del cliente:</h3>
            <p style="margin: 5px 0;">• Nombre: ${user.name}</p>
            <p style="margin: 5px 0;">• Correo: ${user.email}</p>
            <p style="margin: 5px 0;">• Teléfono: ${user.phone}</p>
            ${typeItem == "producto" ? `<p style="margin: 5px 0;">• Dirección: ${user.address}</p>` : ""}
        </div>
        
        <!-- Detalles de la compra -->
        <div style="margin: 0 0 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Detalles de la compra:</h3>
            ${infoBuy.join('')}
            ${typeItem == "producto" ? `
            <div style="margin: 15px 0 0 0; padding-top: 10px; border-top: 1px dashed #ddd;">
                <p style="margin: 5px 0; font-weight: bold;">TOTAL: $${totalPrice} COP</p>
            </div>
            ` : ""}
        </div>
        
        <!-- Botón de cancelación -->
        ${content.showCancel ? `
        <div style="text-align: center; margin: 25px 0 15px 0;">
            <a href="${cancelRoute}?token=${userToken}&bill_id=${bill_id}" 
               style="display: inline-block; padding: 12px 25px; background-color: #dc3545; color: white; 
               text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px;">
               ✗ Cancelar compra
            </a>
            <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">
                Tienes 24 horas para cancelar. Se reembolsará el 20% del valor.
            </p>
        </div>
        ` : ''}
        
        <!-- Sección de cancelación -->
        ${content.showCancelation ? `
        <div style="background-color: #fff8f8; padding: 15px; border-radius: 6px; margin: 0 0 20px 0; border: 1px solid #ffdddd;">
            <h3 style="margin: 0 0 10px 0; color: #dc3545; font-size: 16px;">Compra cancelada</h3>
            <p style="margin: 0;">La compra ha sido cancelada exitosamente.</p>
        </div>
        ` : ''}
        
        <!-- Reembolso -->
        ${content.showRefund ? `
        <div style="background-color: #f8fff8; padding: 15px; border-radius: 6px; margin: 0 0 20px 0; border: 1px solid #ddffdd;">
            <h3 style="margin: 0 0 10px 0; color: #28a745; font-size: 16px;">Reembolso procesado</h3>
            <p style="margin: 5px 0;">• Porcentaje reembolsado: 20%</p>
            <p style="margin: 5px 0;">• Valor reembolsado: $${totalPrice * 0.2} COP</p>
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