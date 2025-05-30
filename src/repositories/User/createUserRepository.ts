import db from "../../config/db";
import { User } from "../../models/User/User";

export const createUserRepository = async (newUser: User): Promise<User> => {
    const { name, email, password, phone_number, verified, role, token_version } = newUser;

    try {
        const sql = 'INSERT INTO usuario (nombre, correo, contraseña, telefono, verificado, rol, token_version) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result]: any = await db.execute(sql, [
            name,
            email,
            password,
            phone_number,
            verified,
            role,
            token_version
        ]);

        const insertedId = result.insertId;

        const [rows]: any = await db.execute(
            'SELECT usuario_id, nombre, correo, telefono, verificado, rol, token_version FROM usuario WHERE usuario_id = ?',
            [insertedId]
        );

        if (!rows || rows.length === 0) {
            throw new Error('No se pudo recuperar el usuario después de crearlo');
        }

        const userRow = rows[0];

        return new User(
            userRow.nombre,
            userRow.correo,
            userRow.telefono || '',
            '',
            userRow.verificado,
            userRow.rol,
            userRow.usuario_id,
            '',
            userRow.token_version
        );
    } catch (error) {
        console.error('Error en createUserRepository:', error);
        throw new Error(`Error al crear usuario en la base de datos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
};
