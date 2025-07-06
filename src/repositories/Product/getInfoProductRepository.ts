import db from '@/config/db';

export async function getInfoProductRepository(producto_id: number) {
    const sql = `
        SELECT 
            s.servicio_id AS product_id,
            s.nombre AS name,
            s.precio AS price,
            s.imagen AS image,
            s.stock,
            s.descripcion as description,
            COALESCE(ROUND(AVG(v.puntuacion), 2), 0) as rating,
            GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ';') AS category,
            s.experiencia_id as experience_id,
            e.nombre as name_experience,
            e.ubicacion as location
        FROM servicio s
        LEFT JOIN valoracion v ON s.servicio_id = v.producto_id
        LEFT JOIN servicio_categoria sc ON sc.servicio_id = s.servicio_id
        LEFT JOIN categoria c ON c.categoria_id = sc.categoria_id
        LEFT JOIN experiencia e ON e.experiencia_id = s.experiencia_id
        WHERE s.estado = 'activo' AND s.tipo = 'producto' AND s.servicio_id = ?
        GROUP BY 
            s.nombre, 
            s.precio, 
            s.imagen,
            c.nombre,
            s.servicio_id,
            e.nombre
        ORDER BY s.nombre ASC;
    `;
    const [rows]: any = await db.execute(sql, [producto_id]);
    if (rows.length === 0) return;
    return rows[0];
} 