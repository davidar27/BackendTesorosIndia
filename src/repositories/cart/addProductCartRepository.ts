import db from "../../config/db";

export const addProductCartRepository = async (userId: number, productId: number, quantity: number): Promise<void> => {
    const [rows]: any[] = await db.query(
        'SELECT * FROM carrito WHERE cliente_id = ? AND producto_id = ?',
        [userId, productId]
    );
    if (rows.length > 0) {
        await db.query(
            'UPDATE carrito SET cantidad = cantidad + ? WHERE cliente_id = ? AND producto_id = ?',
            [quantity, userId, productId]
        );
    } else {
        await db.query(
            'INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)',
            [userId, productId, quantity]
        );
    }
};
2