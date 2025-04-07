import db from "../../config/db";

export const updateQuantityCartRepostory = async (userId: number, productId: number, quantity: number): Promise<void> => {
    await db.query(
        'UPDATE carrito SET cantidad = ? WHERE cliente_id = ? AND producto_id = ?',
        [quantity, userId, productId]
    );
};
