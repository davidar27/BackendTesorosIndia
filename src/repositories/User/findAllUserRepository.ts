import db from '@/config/db';
import { User } from '@/models/User/User';


export const findAllUserRepository = async (): Promise<User[]> => {
    const sql = `SELECT 
    u.usuario_id AS id,
    u.nombre AS name,
    u.correo AS email,
    u.telefono AS phone,
    DATE_FORMAT(u.fecha_registro, '%d/%m/%Y') AS joinDate,
    u.estado AS status,
    u.imagen AS image,
    f.nombre AS name_farm
FROM usuario u
LEFT JOIN finca f ON u.usuario_id = f.emprendedor_id
WHERE u.rol = 'emprendedor';
`;
    const [rows]: any = await db.execute(sql);
    return rows;
};

