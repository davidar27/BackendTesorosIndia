import db from "../../config/db";
import { Product } from "../../models/Product/Product";

export async function getAllProductsRepository(gUseId: number): Promise<Product[]> {
    const sql = `SELECT * FROM producto WHERE emprendedor_id = ?`;
    const [rows]: any = await db.execute(sql, [gUseId]);
    return rows;
}