import { query } from "../../helpers/db/query";
import user from "../../models/User/user";


const findAllUserRepositories = async (): Promise<user[]> => {
    const sql = 'SELECT usuario_id, nombre, apellido, correo, telefono, fecha_registro, estado FROM usuario';
    return await query(sql);
};

export default findAllUserRepositories;