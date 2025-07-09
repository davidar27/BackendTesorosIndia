import db from '@/config/db';

export const updateProductStatusRepository = async ( product_id: number): Promise<void> => {

    const sql = `UPDATE servicio SET estado = 'inactivo' WHERE servicio_id = ?`;
    const [result]: any = await db.execute(sql, [product_id]);
    if (result.affectedRows === 0) {
        throw new Error("El producto no existe o no pertenece al emprendedor.");
    }
} 