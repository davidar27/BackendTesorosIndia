import { findUserByIdRepository } from "@/repositories/User/findUserByIdRepository";
import { generateToken } from "../Tokens/generateToken";
import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';
import { getBillByIDRepository } from "@/repositories/payment/getBillByIDRepository";
import { getItemsBillRepository } from "@/repositories/payment/getItemsBillRepository";
import { findProductEntrepreneurRepository } from "@/repositories/User/findProductEntrepreneurRepository";
import { getPackageExperiencesRepository } from "@/repositories/Package/getPackageExperiencesRepository";
import { getExperienceByIdRepository } from "@/repositories/Experience/getExperienceByIdRepository";

export const getContentBuyNotification = async (role: 'entrepreneur' | 'client', type: 'Cancelacion' | 'Compra', bill_id: number, entrepreneur_id?: number): Promise<string> => {
    const BACKEND_URL = process.env.BACKEND_URL
    const cancelRoute = `${BACKEND_URL}/pagos/cancelar`;

    const [bill] = await getBillByIDRepository(bill_id)
    const itemsBill = await getItemsBillRepository(bill_id)
    const typeItem = itemsBill[0].type

    const user: any = await findUserByIdRepository(bill.user_id as number);
    const payload = createTokenPayload({ userId: user?.userId as number, email: user?.email, experience_id: user?.experience_id, image: user?.image, name: user?.name, role: user?.role }, user.token_version);
    const userToken = generateToken(payload, ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION.VERIFICATION);

    const getContent = () => {
        if (role === 'entrepreneur' && type === 'Compra') {
            return {
                title: `Nueva compra realizada.`,
                message: `Tienes una nueva compra.`,
                showCancel: false,
                showRefund: false,
                showCancelation: false,
            };
        } else if (role === 'client' && type === 'Compra') {
            return {
                title: `Compra de ${type} realizada.`,
                message: `Tu compra ha sido procesada exitosamente. Si necesitas cancelar tu compra, puedes hacerlo utilizando el botón de abajo.`,
                showCancel: true,
                showRefund: false,
                showCancelation: false,
            };
        } else if (type === 'Cancelacion') {
            return {
                title: 'Cancelacion de compra',
                message: `Has cancelado la compra.`,
                showCancel: false,
                showCancelation: true,
                showRefund: true,
            };
        }
    };

    const content: any = getContent();
    const infoBuy = itemsBill.map(async (i: any) => {
        if (typeItem == "producto") {
            const entrepreneur = await findProductEntrepreneurRepository(i.item_id)
            if (role == "client") {
                return `
                Nombre del producto: ${i.name} 
                Precio del producto: ${i.price} 
                Cantidad solicitada: ${i.quantity} 
                Precio total: ${(i.price * i.quantity)} 
                Nombre del emprendedor: ${entrepreneur?.name} 
                Correo del emprendedor: ${entrepreneur?.email} 
                Numero del emprendedor: ${entrepreneur?.phone} 
                <br/>
                `
            }
            if (entrepreneur_id == entrepreneur?.userId) {
                return `
                Nombre del producto: ${i.name} 
                Precio del producto: ${i.price} 
                Cantidad solicitada: ${i.quantity} 
                Precio total: ${(i.price * i.quantity)}
                <br/>
                `
            }
        } else if (typeItem == "paquete") {
            const experiences = await getPackageExperiencesRepository(i.item_id)
            return `
            Nombre del paquete: ${i.name} 
            Duracion del paquete: ${i.duration} 
            Precio del paquete: ${i.price} 
            <br/>
            Experiencias del paquete:
            <br/>
            ${experiences.map(async (e: any) => {
                if (role == "client") {
                    return `Nombre de la experiencia: ${e.name} <br/>`
                }
                if (entrepreneur_id == e.entrepreneur_id) {
                    return `Nombre de la experiencia: ${e.name} <br/>`
                }
            })}
            `
        }
    })

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
                <strong>Informacion de la compra</strong>
                ${infoBuy}
            </p>
            
            ${content.showCancel ? `
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${cancelRoute}?token=${userToken}&bill_id=${bill_id}" 
                    style="display: inline-block; padding: 14px 28px; background-color: #dc3545; color: white; 
                    text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 0 10px 10px 0;">
                    ✗ Cancelar Compra
                    </a>
                    <br/>
                    Recuerda cancelar en un tiempo maximo de 24 horas posterior a la compra.
                    <br/>
                    Al cancelar se te reembolsara un 20% de lo pagado.
                    </div>
            ` : ''}
            
            ${content.showCancelation ? `
                <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                    <strong>Compra cancelada</strong>
                </p>
            ` : ''}

            ${content.showRefund ? `
                <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                    <strong>Reembolso</strong>
                    Se te ha reembolsado el 20% del precio de la compra
                    Cantidad Reembolsada: $${""} COP
                </p>
            ` : ''}
            
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