import db from '@/config/db';

export const getHostelsRepository = async () => {
    const sql = `
        SELECT
        e.experiencia_id AS hostel_id,
        e.nombre AS name,
        e.descripcion AS description,
        e.ubicacion AS location,
        e.imagen AS image,
        AVG(v.puntuacion) AS rating
    FROM experiencia e
    LEFT JOIN valoracion v ON e.experiencia_id = v.experiencia_id
    WHERE e.estado = 'publicada' AND e.tipo = 'Hostal'
    GROUP BY e.experiencia_id, e.nombre, e.descripcion, e.ubicacion, e.imagen;

    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 