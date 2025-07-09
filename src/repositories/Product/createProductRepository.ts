import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export async function createProductRepository(product: Product): Promise<number> {
    
    const checkSql = `SELECT servicio_id FROM servicio WHERE nombre = ? AND experiencia_id = ? AND tipo = 'producto'`;
    const checkValues = [product.name, product.experience_id];
    const [existing]: any = await db.execute(checkSql, checkValues);
    if (existing.length > 0) {
        throw new Error("Este producto ya ha sido registrado por el emprendedor.");
    }

    const query = `
        INSERT INTO servicio (nombre, descripcion, precio, stock, experiencia_id, imagen, tipo)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        product.name,
        product.description,
        Number(product.price),
        Number(product.stock),
        product.experience_id,
        product.image,
        'producto'
    ];

    const [result]: any = await db.execute(query, values);
    const queryCategory = `
        INSERT INTO servicio_categoria (categoria_id, servicio_id)
        VALUES (?, ?)
    `;
    const valuesCategory = [
        Number(product.category_id),
        result.insertId,
    ];
    await db.execute(queryCategory, valuesCategory);

    return result.insertId;
}
