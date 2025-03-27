import user from "../../models/User/user";
import { query } from "../../helpers/db/query";

const updateUserRepositories = async (user_id: number, user: user): Promise<void> => {
    const { first_name, last_name, email, phone_number } = user;
    const sql = 'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE usuario_id = ?';
    await query(sql, [first_name, last_name, email, phone_number, user_id]);
};

export default updateUserRepositories;