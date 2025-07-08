import db from '@/config/db';

export const deleteProductRepository = async (product_id: number, entrepreneur_id: number): Promise<void> => {
    const experienceQuery = `SELECT experiencia_id AS experience_id FROM experiencia WHERE emprendedor_id = ?`;
    const [experience]: any = await db.execute(experienceQuery, [entrepreneur_id]);

    const sql = `DELETE FROM servicio WHERE servicio_id = ? AND experiencia_id = ?`;
    const [result]: any = await db.execute(sql, [product_id, experience[0].experience_id]);
    if (result.affectedRows === 0) {
        throw new Error("El producto no existe o no pertenece al emprendedor.");
    }
}
