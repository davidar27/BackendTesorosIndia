import db from '@/config/db';

export const emptyCartRepository = async (user_id: number): Promise<any> => {
    await db.query('DELETE FROM carrito WHERE cliente_id = ?', [user_id]);
    return "Carrito vaciado con exito."
};
