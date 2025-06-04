import db from "@/config/db";



export const desactivateEntrepreneurRepository = async (userId: number) => {
    try {
        const sql = `UPDATE usuario SET estado = 'inactivo' WHERE usuario_id = ?`;
        const [rows]: any = await db.execute(sql, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
}
