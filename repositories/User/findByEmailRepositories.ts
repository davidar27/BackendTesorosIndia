import { query } from "../../helpers/db/query";
import user from "../../models/User/user";


const findByEmailRepositories = async (email: string): Promise<user | null> => {
    const sql = 'SELECT correo FROM usuario WHERE correo = ?';
    const rows = await query(sql, [email]);
    return rows[0] || null;
};

export default findByEmailRepositories;