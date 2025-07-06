import db from '@/config/db';

export const getPackageRepository = async (id: number) => {
    const sql = `
        SELECT
            s.servicio_id AS id,
            s.nombre AS name,
            s.descripcion AS description, 
            s.precio AS price,
            s.duracion AS duration,
            s.capacidad AS capacity,
            s.imagen AS image,
            s.estado AS status,
            DATE_FORMAT(CONVERT_TZ(s.fecha_registro, '+00:00', '-05:00'), '%d/%m/%Y') AS joinDate,
            s.fechas_no_disponibles AS unavailableDates
            FROM servicio s
        WHERE s.tipo = 'paquete' AND s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [id]);
    return rows;
}; 