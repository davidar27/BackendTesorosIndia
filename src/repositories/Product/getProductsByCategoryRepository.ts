import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export const getProductsByCategoryRepository = async (categoryId: number): Promise<Product[]> => {
    const sql = `SELECT servicio_id, nombre, precio, imagen  FROM servicio WHERE categoria_id = ? AND WHERE tipo = 'producto'`;
    const [rows]: any = await db.execute(sql, [categoryId]);
    return rows;
}; 