import db from '@/config/db';

export const getHostelsRepository = async () => {
    const sql = `
        SELECT
            experiencia_id AS hostel_id,
            nombre AS name,
            descripcion AS description,
            ubicacion AS location,
            imagen AS image
        FROM experiencia
        WHERE estado = 'publicada' AND tipo = 'Hostal'
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 