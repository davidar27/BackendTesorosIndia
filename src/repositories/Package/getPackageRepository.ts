import db from '@/config/db';

export const getPackageRepository = async (package_id: number) => {
    const sql = `
        SELECT
            s.servicio_id AS package_id,
            s.imagen AS image,
            s.precio AS price,
            s.nombre AS name,
            s.descripcion AS description,
            s.capacidad AS capacity,
            s.duracion AS duration
        FROM servicio s
        WHERE s.tipo = 'paquete' AND s.estado = 'activo' AND s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [package_id]);
    return rows;
}; 