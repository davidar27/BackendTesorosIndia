import db from "../../config/db";
import { User } from "../../models/User/User";


export const findByEmailRepository = async (email: string): Promise<User | null> => {
    const sql = 'SELECT * FROM usuario WHERE correo = ?';
    const [rows]: any = await db.execute(sql, [email]);
    if (rows.length === 0) return null;
    const user: User = rows[0] as User;
    return user;
};

