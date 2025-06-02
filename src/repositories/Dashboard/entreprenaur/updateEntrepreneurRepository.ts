import db from '@/config/db';
import { User } from '@/models/User/User';

export const updateEntrepreneurRepository = async (userData: User): Promise<User> => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.execute(
            `UPDATE usuario 
             SET nombre = ?, telefono = ?, imagen = ?, descripcion = ?
             WHERE usuario_id = ? AND rol = 'emprendedor'`,
            [
                userData.name,
                userData.phone,
                userData.image || null,
                userData.description || null,
                userData.userId
            ]
        );

        if (userData.name_farm) {
            await connection.execute(
                `UPDATE finca 
                 SET nombre = ?
                 WHERE emprendedor_id = ?`,
                [userData.name_farm, userData.userId]
            );
        }

        const [rows]: any = await connection.execute(
            `SELECT 
                u.usuario_id, u.nombre, u.correo, u.telefono, u.rol, 
                u.verificado, u.imagen, u.descripcion, f.nombre as name_farm
             FROM usuario u
             LEFT JOIN finca f ON u.usuario_id = f.emprendedor_id
             WHERE u.usuario_id = ? AND u.rol = 'emprendedor'`,
            [userData.userId]
        );

        await connection.commit();

        if (!rows[0]) {
            throw new Error('Emprendedor no encontrado');
        }

        const userFromDb = rows[0];
        return new User({
            userId: userFromDb.usuario_id,
            name: userFromDb.nombre,
            email: userFromDb.correo,
            password: '', 
            phone: userFromDb.telefono,
            role: 'emprendedor',
            verified: Boolean(userFromDb.verificado),
            image: userFromDb.imagen || '',
            description: userFromDb.descripcion,
            name_farm: userFromDb.name_farm,
            token_version: userData.token_version
        });
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}; 