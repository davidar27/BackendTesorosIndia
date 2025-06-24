import db from '@/config/db';

export const getProductRepository = async (productId: number): Promise<any> => {
    const [rows] = await db.query(
        'SELECT * FROM servicio WHERE servicio_id = ? AND tipo = "producto"',
        [productId]
    );
    return rows as any[];
};
