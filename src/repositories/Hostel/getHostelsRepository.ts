import db from '@/config/db';

export const getHostelsRepository = async () => {
    const sql = `
        SELECT
            s.servicio_id AS hostel_id,
            s.nombre AS name,
            s.descripcion AS description,
            s.precio AS price,
            s.fecha_registro AS create_date,
            s.capacidad AS capacity,
            s.duracion AS duration,
            s.imagen AS image,
            s.fechas_no_disponibles AS dates_unavailable
        FROM servicio s
        WHERE s.tipo = 'habitacion' AND s.estado = 'activo'
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 