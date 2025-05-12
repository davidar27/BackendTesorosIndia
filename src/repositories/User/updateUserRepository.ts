import db from "../../config/db";
import { User } from "../../models/User/User";

export const updateUserRepository = async (user_id: number, newUser: User): Promise<void> => {
    const { name, email, phone_number } = newUser;
    const sql = 'UPDATE usuario SET nombre = ?, correo = ?, telefono = ? WHERE usuario_id = ?';
    await db.execute(sql, [name,email, phone_number, user_id]);
};