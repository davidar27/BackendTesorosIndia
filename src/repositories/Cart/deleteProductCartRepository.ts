import db from '@/config/db';

export const deleteProductCartRepository = async (userId: number, productId: number): Promise<any> => {
    await db.query(
        'DELETE FROM carrito WHERE cliente_id = ? AND servicio_id = ?',
        [userId, productId]
    );
    return "Producto eliminado con exito."
};
