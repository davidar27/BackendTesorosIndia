import db from '../../config/db';

export async function getTopProductsByExperienceRepository(experiencie_id: number) {
    const query = `
        SELECT 
    s.servicio_id AS id,
    s.nombre AS name,
    s.experiencia_id,
    s.precio AS price,
    s.imagen AS image,
    SUM(fd.cantidad) AS totalSold,
    GROUP_CONCAT(DISTINCT c.nombre SEPARATOR '; ') AS category
FROM factura_detalle fd
JOIN servicio s ON fd.servicio_id = s.servicio_id
LEFT JOIN servicio_categoria sc ON s.servicio_id = sc.servicio_id
LEFT JOIN categoria c ON sc.categoria_id = c.categoria_id
WHERE s.experiencia_id = ? AND s.tipo = 'producto' AND s.estado = 'activo'
GROUP BY s.servicio_id, s.nombre, s.experiencia_id, s.precio, s.imagen
ORDER BY totalSold DESC
LIMIT 3;

    `;
    const [rows] = await db.query(query, [experiencie_id]);
    return rows;
} 