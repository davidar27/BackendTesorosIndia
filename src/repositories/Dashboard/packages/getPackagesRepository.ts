import db from '@/config/db';

export const getPackagesRepository = async () => {
    const sql = `
            SELECT 
        s.servicio_id AS id,
        s.nombre AS name,
        s.descripcion AS description,
        s.precio AS price,
        s.precio AS pricePerPerson,
        s.duracion AS duration,
        s.capacidad AS capacity,
        s.imagen AS image,
        s.estado AS status,
        DATE_FORMAT(s.fecha_registro, '%d/%m/%Y') AS joinDate,
        s.fechas_no_disponibles AS unavailableDates
    FROM
        servicio s
    WHERE
        s.tipo = 'paquete'
        ;
        `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 