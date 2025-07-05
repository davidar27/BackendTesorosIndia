// import { insertFacturaRespository } from '@/repositories/payment/insertFacturaRespository';
// import { PaymentResponse } from 'mercadopago/dist/clients/order/commonTypes';




// export const saveFacturaFromPayment = async (payment: PaymentResponse) => {
//     const usuario_id = payment.metadata?.usuario_id;
//     const servicios = payment.metadata?.servicios;

//     if (!usuario_id || !Array.isArray(servicios)) {
//         console.warn("⚠️ Webhook sin metadata suficiente");
//         return;
//     }

//     const factura = {
//         usuario_id,
//         total: payment.transaction_amount,
//         estado: 'pagada',
//         servicios
//     };

//     await insertFacturaRespository(factura);
// };
