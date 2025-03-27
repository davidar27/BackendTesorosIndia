import db from "../../config/db";
import { User } from "../../models/User/User";


export const findAllUserRepository = async (): Promise<User[]> => {
    const sql = 'SELECT usuario_id, nombre, apellido, correo, telefono, fecha_registro, estado FROM usuario';
    const [rows] : any = await db.execute(sql);
    return rows;
};

