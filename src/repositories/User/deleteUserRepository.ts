import db from "../../config/db";


export const deleteUserRepository = async (userId: number): Promise<void> => {
    const sql = 'UPDATE usuario SET estado = "inactivo" WHERE usuario_id = ?';
    await db.execute(sql, [userId]);
};

