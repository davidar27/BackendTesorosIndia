import db from "../../config/db"; 

export const verifyEmailRepository = async (userId: number): Promise<boolean> => {
    try {
        const sql = `UPDATE usuario SET email_verified = 1 WHERE usuario_id = ?`;
        const values = [userId];

        const [result]: any = await db.execute(sql, values);

        if (result.affectedRows > 0) {
            return true;
        }

        return false;
    } catch (err) {
        console.error('Error al verificar el correo electrónico:', err);
        throw new Error('Error en la verificación del correo electrónico');
    }
};
