import db from '@/config/db';

export const getPacksRepository = async () => {
    const sql = `
        SELECT 
            s.nombre AS name,
            s.descripcion AS description,
            CONCAT( FORMAT(s.precio, 0, "es_CO")) as price,
            s.imagen AS image,
            s.incluye_comida AS has_food
        FROM servicio s
        WHERE s.tipo = 'paquete';
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 