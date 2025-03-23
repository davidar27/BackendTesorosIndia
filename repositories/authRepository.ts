import bcrypt from 'bcryptjs';
import db from '../config/db';
import userAuth from '../models/User/loginUser';

class authRepository {
    static async login(user: userAuth) {
        const sql = `SELECT id, password from users WHERE email = ?`;
        const values = [user.email];
        const result: any = await db.execute(sql, values);
        if (result[0].length > 0) {
            const passwordValid = await bcrypt.compare(user.password, result[0][0].password);
            if (passwordValid) {
                return { logged: true, status: "Successful authentication", id: result[0][0].id, role: result[0][0].role }
            }
            return { logged: false, status: "Invalid username or password" }
        }
        return { logged: false, status: "Invalid username or password" }
    }
}

export default authRepository;