import db from "../../config/db";

export const getProductRepository = async (productId: number): Promise<any> => {
    const [rows] = await db.query(
        'SELECT * FROM producto WHERE producto_id = ?',
        [productId]
    );
    return rows as any[];
};
