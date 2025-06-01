import db from '@/config/db';

export const deleteProductRepository = async(producto_id: number, emprendedor_id: number): Promise<void> => {
    const sql = `DELETE FROM producto WHERE producto_id = ? AND emprendedor_id = ?`;
    const [result]: any = await db.execute(sql, [producto_id, emprendedor_id]);

    if (result.affectedRows === 0) {
        throw new Error("El producto no existe o no pertenece al emprendedor.");
    }
}
