import db from '@/config/db';
import { calculatePriceWithTax } from '@/helpers/price/calculatePriceWithTax';



export const getCartRepository = async (userId: number): Promise<any[]> => {
    const [rows] = await db.query(
        `
      SELECT 
        c.carrito_id AS cartId,
        c.servicio_id AS productId,
        s.nombre AS name,
        c.cantidad AS quantity,
        s.precio AS price,
        s.imagen as image,
        s.stock
      FROM carrito c
      JOIN servicio s ON c.servicio_id = s.servicio_id
      WHERE c.cliente_id = ?;
    `,
        [userId]
    );


    const result = (rows as any[]).map(row => {
        const price = Number(row.price);
        return {
            ...row,
            priceWithTax: calculatePriceWithTax(price),
        };
    });




    return result;
};
