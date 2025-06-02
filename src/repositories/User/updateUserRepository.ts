import db from '@/config/db';
import { User } from '@/models/User/User';

export const updateUserRepository = async (userData: User): Promise<User> => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.execute(
            `UPDATE usuario 
             SET nombre = ?, telefono = ?, imagen = ?, direccion = ?
             WHERE usuario_id = ?`,
            [
                userData.name,
                userData.phone,
                userData.image || null,
                userData.address || null,
                userData.userId
            ]
        );

        const [rows]: any = await connection.execute(
            `SELECT usuario_id, nombre, correo, telefono, rol, verificado, imagen, descripcion, direccion 
             FROM usuario WHERE usuario_id = ?`,
            [userData.userId]
        );

        await connection.commit();

        if (!rows[0]) {
            throw new Error('Usuario no encontrado');
        }

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
            token_version: userData.token_version
        });
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
