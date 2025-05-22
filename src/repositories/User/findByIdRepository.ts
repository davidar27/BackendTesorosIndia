import db from "../../config/db";
import { User } from "../../models/User/User";


export const findByIdRepository = async (id: string): Promise<User | null> => {
    const sql = 'SELECT usuario_id FROM usuario WHERE usuario_id = ?';
    const [rows]: any = await db.execute(sql, [id]);
    if (rows.length === 0) return null;
    const user: User = rows[0] as User;
    return user;
};

