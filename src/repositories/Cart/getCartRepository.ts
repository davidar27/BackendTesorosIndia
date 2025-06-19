import db from '@/config/db';

export const getCartRepository = async (user_id: number): Promise<any[]> => {
    const [rows] = await db.query(
        `
            SELECT 
                c.carrito_id AS cart_id,
                c.servicio_id AS product_id,
                s.nombre AS name,
                c.cantidad AS quantity,
                s.precio AS price
            FROM carrito c
            JOIN servicio s ON c.servicio_id = s.servicio_id
            WHERE c.cliente_id = ?;
        `
        [user_id]
    );
    return rows as any[];
};
