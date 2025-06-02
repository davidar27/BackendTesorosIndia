import db from '@/config/db';
import { Farm } from '@/models/Farm/Farm';

export const getDashboardFarmsRepository = async (): Promise<Farm[]> => {
    const sql = `
        SELECT 
            f.finca_id AS id,
            f.nombre AS name_farm,
            f.descripcion AS description,
            f.ubicacion AS location,
            f.fecha_creacion AS created_at,
            f.estado AS status,
            u.nombre AS entrepreneur_id
        FROM finca f
        LEFT JOIN usuario u ON f.emprendedor_id = u.usuario_id
        ORDER BY f.fecha_creacion DESC
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 