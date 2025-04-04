import db from "../../config/db";
import { User } from "../../models/User/user";

export const createEntrepreneurRepository = async (newUser: User): Promise<void> => {
    const { first_name, last_name, email, password, phone_number, role, description } = newUser;

    const sqlUser = 'INSERT INTO usuario (nombre, apellido, correo, contraseña, telefono, rol,descripcion_emprendedor) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result]: any = await db.execute(sqlUser, [first_name, last_name, email, password, phone_number, role, description]);
    return result.insertId;
};
