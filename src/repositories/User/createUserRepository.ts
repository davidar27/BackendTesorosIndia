import db from "../../config/db";
import { User } from "../../models/User/User";

export const createUserRepository = async (newUser: User): Promise<User> => {
    const { name, email, password, phone_number, verified } = newUser;

    const sql = 'INSERT INTO usuario (nombre, correo, contraseña, telefono, verificado) VALUES (?, ?, ?, ?, ?)';
    const [result]: any = await db.execute(sql, [
        name,
        email,
        password,
        phone_number,
        verified,
    ]);

    const insertedId = result.insertId;
    const [rows]: any = await db.execute(
        'SELECT usuario_id, nombre, correo, telefono, verificado, rol FROM usuario WHERE usuario_id = ?',
        [insertedId]
    );

    const userRow = rows[0];

    return new User(
        userRow.usuario_id,
        userRow.nombre,
        userRow.correo,
        userRow.telefono,
        '',
        Boolean(userRow.verificado),
        userRow.rol
    );


};
