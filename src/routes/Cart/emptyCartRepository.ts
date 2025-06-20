import db from '@/config/db';

export const emptyCartRepository = async (userId: number): Promise<void> => {
    await db.query('DELETE FROM carrito WHERE cliente_id = ?', [userId]);
};
