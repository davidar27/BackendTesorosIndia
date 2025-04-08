import db from "../../config/db";
import { Product } from "../../models/Product/Product";



export async function createProductRepository(product: Product): Promise<number> {
    const checkSql = `SELECT producto_id FROM producto WHERE nombre = ? AND emprendedor_id = ?`;
    const checkValues = [product.nombre, product.emprendedor_id];

    const [existing]: any = await db.execute(checkSql, checkValues);

    if (existing.length > 0) {
        throw new Error("Este producto ya ha sido registrado por el emprendedor.");
    }
    const sql = `INSERT INTO producto (nombre, descripcion, precio, stock, categoria_id, emprendedor_id, estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        product.nombre,
        product.descripcion || null,
        product.precio || null,
        product.stock || null,
        product.categoria_id || null,
        product.emprendedor_id,
        product.estado || 'disponible'
    ];

    const [result]: any = await db.execute(sql, values);
    return result.insertId;
}
