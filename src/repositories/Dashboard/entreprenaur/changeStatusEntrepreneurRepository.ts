import db from "@/config/db";

export const changeStatusEntrepreneurRepository = async (userId: number, status: string) => {
    await db.query('UPDATE usuario SET estado = ? WHERE usuario_id = ? AND rol = ?', [status, userId, 'emprendedor']);
};