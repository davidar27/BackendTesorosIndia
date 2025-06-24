import { MercadoPagoConfig, Preference } from 'mercadopago';

const mercadopagoClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

export { mercadopagoClient, Preference };
