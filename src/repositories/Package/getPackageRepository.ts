import db from '@/config/db';

export const getPackageRepository = async () => {
    const sql = `
        SELECT
            s.imagen AS image,
            CONCAT( FORMAT(s.precio, 0, "es_CO")) as price,
            s.nombre AS name,
            s.servicio_id AS package_id,
            s.descripcion AS description,
            s.capacidad AS capacity,
            s.duracion AS duration
        FROM servicio s
        WHERE s.tipo = 'paquete' AND s.estado = 'activo';
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 