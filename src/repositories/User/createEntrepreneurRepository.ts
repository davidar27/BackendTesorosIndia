import db from "../../config/db";
import { User } from "../../models/User/User";

export const createEntrepreneurRepository = async (newUser: User): Promise<void> => {
    const { name, email, password, phone_number, role, description } = newUser;

    const sqlUser = 'INSERT INTO usuario (nombre, correo, contraseña, telefono, rol,descripcion_emprendedor) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result]: any = await db.execute(sqlUser, [name, email, password, phone_number, role, description]);
    return result.insertId;
};
