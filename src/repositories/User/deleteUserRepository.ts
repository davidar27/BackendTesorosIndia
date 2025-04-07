import db from "../../config/db";


export const deleteUserRepository = async (user_id: number): Promise<void> => {
    const sql = 'DELETE FROM usuario WHERE usuario_id = ?';
    await db.execute(sql, [user_id]);
};

