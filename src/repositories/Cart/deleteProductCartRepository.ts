import db from '@/config/db';

export const deleteProductCartRepository = async (user_id: number, product_id: number): Promise<any> => {
    await db.query(
        'DELETE FROM carrito WHERE cliente_id = ? AND servicio_id = ?',
        [user_id, product_id]
    );
    return "Producto eliminado con exito."
};
