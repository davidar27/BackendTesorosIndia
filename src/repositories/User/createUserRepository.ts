import db from "../../config/db";
import { User } from "../../models/User/User";

export const createUserRepository = async (newUser: User): Promise<User> => {
    const { name, email, password, phone_number } = newUser;
    const sql = 'INSERT INTO usuario (nombre, correo, contraseña, telefono) VALUES (?, ?, ?, ?)';
    const [result]: any = await db.execute(sql, [name, email, password, phone_number]);
    return result.insertId;
};
