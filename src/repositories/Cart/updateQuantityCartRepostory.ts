import db from '@/config/db';

export const updateQuantityCartRepostory = async (userId: number, productId: number, quantity: number): Promise<any> => {
    await db.query(
        'UPDATE carrito SET cantidad = ? WHERE cliente_id = ? AND servicio_id = ?',
        [quantity, userId, productId]
    );
    return "Cantidad actualizada con exito."
};
