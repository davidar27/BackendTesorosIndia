import db from "../../config/db";
import { Product } from "../../models/Product/Product";

export async function updateProductRepository(producto_id: number, product: Partial<Product>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    if (product.nombre !== undefined) {
        fields.push("nombre = ?");
        values.push(product.nombre);
    }
    if (product.descripcion !== undefined) {
        fields.push("descripcion = ?");
        values.push(product.descripcion);
    }
    if (product.precio !== undefined) {
        fields.push("precio = ?");
        values.push(product.precio);
    }
    if (product.stock !== undefined) {
        fields.push("stock = ?");
        values.push(product.stock);
    }
    if (product.categoria_id !== undefined) {
        fields.push("categoria_id = ?");
        values.push(product.categoria_id);
    }
    if (product.estado !== undefined) {
        fields.push("estado = ?");
        values.push(product.estado);
    }

    if (fields.length === 0) {
        throw new Error("No hay campos para actualizar");
    }

    const sql = `UPDATE producto SET ${fields.join(", ")} WHERE producto_id = ?`;
    values.push(producto_id);
    await db.execute(sql, values);
}