import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export async function getProductByIdRepository(producto_id: number): Promise<Product | null> {    
    const sql = `SELECT * FROM producto WHERE producto_id = ?`;
    const [rows]: any = await db.execute(sql, [producto_id]);
    if (rows.length === 0) return null;
    return rows[0] as Product;
} 