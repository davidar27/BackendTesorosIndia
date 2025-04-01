import db from "../../config/db";
import { User } from "../../models/User/user";

export const createEntrepreneurRepository = async (newUser: User, description?: string): Promise<void> => {
    const { first_name, last_name, email, password, phone_number, role } = newUser;

    const sqlUser = 'INSERT INTO usuario (nombre, apellido, correo, contraseña, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)';
    const [result]: any = await db.execute(sqlUser, [first_name, last_name, email, password, phone_number, role]);

    const userId = result.insertId;
    
    const sqlEmprendedor = 'UPDATE emprendedor SET descripcion = ? WHERE usuario_id = ?';
    
    await db.execute(sqlEmprendedor, [description, userId]);
    
};
