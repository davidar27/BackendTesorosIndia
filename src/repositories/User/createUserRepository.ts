import db from '@/config/db';
import { User } from '@/models/User/User';

export const createUserRepository = async (userData: User): Promise<User> => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [result]: any = await connection.execute(
            `INSERT INTO usuario (nombre, correo, contraseña, telefono, rol, verificado, imagen, descripcion, direccion) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userData.name,
                userData.email,
                userData.password,
                userData.phone,
                userData.role,
                userData.verified,
                userData.image || null,
                userData.description || null,
                userData.address || null
            ]
        );

        const userId = result.insertId;

        const [rows]: any = await connection.execute(
            `SELECT usuario_id, nombre, correo, telefono, rol, verificado, imagen, descripcion, direccion 
             FROM usuario WHERE usuario_id = ?`,
            [userId]
        );

        await connection.commit();

        const userFromDb = rows[0];
        return new User({
            userId: userFromDb.usuario_id,
            name: userFromDb.nombre,
            email: userFromDb.correo,
            password: '',
            phone: userFromDb.telefono,
            role: userFromDb.rol,
            verified: Boolean(userFromDb.verificado),
            image: userFromDb.imagen || '',
            description: userFromDb.descripcion,
            address: userFromDb.direccion,
            token_version: 0
        });
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
