import db from '@/config/db';

export const getPackagesRepository = async () => {
    const sql = `
        SELECT 
            s.servicio_id AS package_id,
            s.nombre AS name,
            s.descripcion AS description, 
            s.precio AS price,
            s.duracion AS duration,
            s.capacidad AS capacity,
            s.imagen AS image,
            s.fechas_no_disponibles AS unavailableDates
        FROM servicio s
        WHERE s.tipo = 'paquete' AND s.estado = 'activo';
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 