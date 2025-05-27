import db from "../../config/db";
import { User } from "../../models/User/User";


export const findAllUserRepository = async (): Promise<User[]> => {
    const sql = `SELECT 
    u.usuario_id,
        u.nombre,
            u.correo,
            u.telefono,
            u.fecha_registro,
            u.estado,
            f.nombre AS finca
FROM usuario u
LEFT JOIN finca f ON u.usuario_id = f.emprendedor_id
WHERE u.rol = "emprendedor"; `;
    const [rows]: any = await db.execute(sql);
    return rows;
};

