import db from "../../config/db";

export const getCartRepository = async (userId: number): Promise<any[]> => {
    const [rows] = await db.query(
        'SELECT c.producto_id, c.cantidad, p.nombre, p.descripcion, p.precio ' +
        'FROM carrito c ' +
        'INNER JOIN producto p ON c.producto_id = p.producto_id ' +
        'WHERE c.cliente_id = ?',
        [userId]
    );
    return rows as any[];
};
