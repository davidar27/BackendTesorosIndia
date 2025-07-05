import { Preference } from 'mercadopago';
import { Request, Response } from 'express';
import { mercadopagoClient } from '@/config/mercadopago';

const FRONTEND_URL = process.env.FRONTEND_URL;

export const handlerPreference = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data || !data.items) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const preference = new Preference(mercadopagoClient);
        const response = await preference.create({
            body: {
                notification_url: FRONTEND_URL,
                items: data.items.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    unit_price: item.unit_price,
                    quantity: item.quantity,
                })),
                payer: {
                    name: data.payer.name,
                    surname: data.payer.surname,
                    email: data.payer.email,
                    address: {
                        street_name: data.payer.address.street_name,
                        street_number: data.payer.address.street_number,
                        zip_code: data.payer.address.zip_code,
                    }
                },
                back_urls: {
                    success: `${FRONTEND_URL}/pago/exitoso`,
                    failure: `${FRONTEND_URL}/pago/fallido`,
                    pending: `${FRONTEND_URL}/pago/pendiente`
                },
                auto_return: 'approved',
                payment_methods: {
                    installments: 1,
                    default_installments: 1,
                },


            }
        });

        console.log(response.id)

        return res.status(200).json({
            preferenceId: response.id,
            init_point: response.init_point,
            status: 'preference_created',
        });
    } catch (error: any) {
        if (!FRONTEND_URL) {
            return res.status(500).json({
                error: 'FRONTEND_URL environment variable is not defined',
                status: 'preference_creation_failed',
            });
        }
        return res.status(500).json({
            error: error.message,
            status: 'preference_creation_failed',
        });
    }
};
