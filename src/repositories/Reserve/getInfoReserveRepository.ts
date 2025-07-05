
import db from '@/config/db';

export const getInfoReserveRepository = async (room_id: number) => {
    const sql = `
        SELECT
            s.servicio_id AS room_id,
            s.nombre AS room_name,
            e.experiencia_id AS hostel_id,
            e.nombre AS hostel_name,
            s.precio AS price,
            s.capacidad AS max_people
        FROM servicio s
        JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        WHERE s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [room_id]);
    return rows;
}; 