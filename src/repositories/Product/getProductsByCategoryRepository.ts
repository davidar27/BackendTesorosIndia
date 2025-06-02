import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export const getProductsByCategoryRepository = async (categoryId: number): Promise<Product[]> => {
    const sql = `SELECT * FROM producto WHERE categoria_id = ?`;
    const [rows]: any = await db.execute(sql, [categoryId]);
    return rows;
}; 