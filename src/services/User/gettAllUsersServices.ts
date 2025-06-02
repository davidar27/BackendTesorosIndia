import { User } from '@/models/User/User';
import db from '@/config/db';

export const getAllUserService = async (): Promise<User[]> => {
    const [rows]: any = await db.execute(
        `SELECT usuario_id, nombre, correo, telefono, rol, verificado, imagen, descripcion, direccion 
         FROM usuario WHERE rol = 'emprendedor'`
    );

    return rows.map((row: any) => new User({
        userId: row.usuario_id,
        name: row.nombre,
        email: row.correo,
        password: '', 
        phone: row.telefono,
        role: row.rol,
        verified: Boolean(row.verificado),
        image: row.imagen || '',
        description: row.descripcion,
        address: row.direccion,
        token_version: 0
    }));
};



