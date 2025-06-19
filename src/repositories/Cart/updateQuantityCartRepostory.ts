import db from '@/config/db';

export const updateQuantityCartRepostory = async (user_id: number, product_id: number, quantity: number): Promise<any> => {
    await db.query(
        'UPDATE carrito SET cantidad = ? WHERE cliente_id = ? AND servicio_id = ?',
        [quantity, user_id, product_id]
    );
    return "Cantidad actualizada con exito."
};
