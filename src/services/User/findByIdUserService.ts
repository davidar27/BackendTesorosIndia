import { User } from '@/models/User/User';
import db from '@/config/db';

export const findByIdUserService = async (userId: number): Promise<User | null> => {
    const [rows]: any = await db.execute(
        `SELECT usuario_id, nombre, correo, telefono, rol, verificado, imagen, descripcion, direccion 
         FROM usuario WHERE usuario_id = ?`,
        [userId]
    );

    if (!rows[0]) {
        return null;
    }

    const userFromDb = rows[0];
    return new User({
        userId: userFromDb.usuario_id,
        name: userFromDb.nombre,
        email: userFromDb.correo,
        password: '', // No devolvemos la contraseña
        phone: userFromDb.telefono,
        role: userFromDb.rol,
        verified: Boolean(userFromDb.verificado),
        image: userFromDb.imagen || '',
        description: userFromDb.descripcion,
        address: userFromDb.direccion,
        token_version: 0
    });
};


