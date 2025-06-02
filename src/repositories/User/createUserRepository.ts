import db from '@/config/db';
import { User } from '@/models/User/User';

export const createUserRepository = async (userData: User) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [result]: any = await connection.execute(
            `INSERT INTO usuario (nombre, correo, contraseña, telefono, verificado) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userData.name,
                userData.email,
                userData.password,
                userData.phone,
                userData.verified,
            ]
        );

        const userId = result.insertId;

        const [user]: any = await connection.execute(
            `SELECT usuario_id, nombre, correo, telefono, rol, verificado
             FROM usuario WHERE usuario_id = ?`,
            [userId]
        );

        await connection.commit();
        return user[0];
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
