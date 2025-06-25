import db from '@/config/db';

export const emptyCartRepository = async (userId: number): Promise<any> => {
    await db.query('DELETE FROM carrito WHERE cliente_id = ?', [userId]);
    return "Carrito vaciado con exito."
};
