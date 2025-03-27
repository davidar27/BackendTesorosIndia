import db from "../../config/db";
import { User } from "../../models/User/User";

export const updateUserRepository = async (user_id: number, newUser: User): Promise<void> => {
    const { first_name, last_name, email, phone_number } = newUser;
    const sql = 'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE usuario_id = ?';
    await db.execute(sql, [first_name, last_name, email, phone_number, user_id]);
};