import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export async function updateProductRepository(product_id: number, product: Product): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    if (product.name !== undefined) {
        fields.push("nombre = ?");
        values.push(product.name);
    }
    if (product.description !== undefined) {
        fields.push("descripcion = ?");
        values.push(product.description);
    }
    if (product.price !== undefined) {
        fields.push("precio = ?");
        values.push(product.price);
    }
    if (product.stock !== undefined) {
        fields.push("stock = ?");
        values.push(product.stock);
    }
    if (product.image !== undefined) {
        fields.push("imagen = ?");
        values.push(product.image);
    }
    if (product.category_id !== undefined) {
        fields.push("categoria_id = ?");
        values.push(product.category_id);
    }

    if (fields.length === 0) {
        throw new Error("No hay campos para actualizar");
    }

    console.log(values)
    console.log(fields)
    console.log("producot" + product_id)
    console.log("expero" + product.experience_id)



    const sql = `UPDATE servicio SET ${fields.join(", ")} WHERE servicio_id = ? AND experiencia_id = ? AND tipo = 'producto'`;
    values.push(product_id);
    values.push(product.experience_id);
    console.log(sql)

    const [result]: any = await db.execute(sql, values);
    if (result.affectedRows == 0) {
        throw new Error("El producto no existe o no pertenece al emprendedor.");
    }
}