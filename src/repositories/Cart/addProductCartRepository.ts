import db from '@/config/db';

export const addProductCartRepository = async (userId: number, productId: number): Promise<string> => {
    const [rows]: any[] = await db.query(
        'SELECT cantidad FROM carrito WHERE cliente_id = ? AND servicio_id = ?',
        [userId, productId]
    );

    if (rows.length > 0) {
        const nuevaCantidad = rows[0].cantidad + 1;
        await db.query(
            'UPDATE carrito SET cantidad = ? WHERE cliente_id = ? AND servicio_id = ?',
            [nuevaCantidad, userId, productId]
        );
        return "Cantidad del producto actualizada en el carrito.";
    } else {
        await db.query(
            'INSERT INTO carrito (cliente_id, servicio_id, cantidad) VALUES (?, ?, ?)',
            [userId, productId, 1]
        );
        return "El producto ha sido agregado al carrito.";
    }
};
