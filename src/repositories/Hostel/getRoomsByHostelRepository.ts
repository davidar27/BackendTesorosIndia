import db from '@/config/db';

export const getRoomsByHostelRepository = async (hostel_id: number) => {
    const sql = `
        SELECT
            s.servicio_id AS room_id,
            s.nombre AS name,
            s.descripcion AS description,
            s.precio AS price,
            s.fecha_registro AS create_date,
            s.capacidad AS capacity,
            s.duracion AS duration,
            s.imagen AS image,
            s.fechas_no_disponibles AS dates_unavailable
        FROM servicio s
        WHERE s.tipo = 'habitacion' AND s.estado = 'activo' AND s.experiencia_id = ?
    `;
    const [rows]: any = await db.execute(sql, [hostel_id]);
    return rows;
}; 