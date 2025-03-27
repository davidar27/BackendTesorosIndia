import db from "../../config/db";

export const deleteProductCartRepository = async (userId: number, productId: number): Promise<void> => {
    await db.query(
        'DELETE FROM carrito WHERE cliente_id = ? AND producto_id = ?',
        [userId, productId]
    );
};
