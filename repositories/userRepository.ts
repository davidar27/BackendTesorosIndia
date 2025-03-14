import User from "../models/userRegisterDto";
import db from "../config/db";
import { log } from "console";

class userRepository{
    static async add(user: User){
        try{
            const sql = 'INSERT INTO users (first_name, last_name, email, phone_number, password ) VALUES (?, ?, ?, ?, ?)';
            const values = [user.first_name, user.last_name, user.email, user.phone_number, user.password];
            const [result] = await db.execute(sql, values);
            return result;
        }catch (error) {
            console.log('Error al registrar usuario',error);
            
        }
    }
}
export default userRepository;