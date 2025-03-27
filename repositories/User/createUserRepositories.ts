import user from "../../models/User/user";
import { query } from "../../helpers/db/query";

const createUserRepositories = async (user: user): Promise<user> => {
    const { first_name, last_name, email, password, phone_number } = user;
    const sql = 'INSERT INTO usuario (nombre, apellido, correo, contraseña, telefono) VALUES (?, ?, ?, ?, ?)';
    const result = await query(sql, [first_name, last_name, email, password, phone_number]);
    return result;
};

export default createUserRepositories;