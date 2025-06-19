import db from '@/config/db';

export const addProductCartRepository = async (user_id: number, product_id: number): Promise<any> => {
    const [rows]: any[] = await db.query(
        'SELECT * FROM carrito WHERE cliente_id = ? AND servicio_id = ?',
        [user_id, product_id]
    );
    if (rows.length > 0) {
        return "El producto ya ha sido agregado previamente."
    } else {
        await db.query(
            'INSERT INTO carrito (cliente_id, servicio_id, cantidad) VALUES (?, ?, ?)',
            [user_id, product_id, 1]
        );
        return "El producto ha sido agregado."
    }
};
2