import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export async function getAllProductsRepository(): Promise<Product[]> {
    const sql = `
        SELECT 
            s.nombre,
            s.precio,
            s.imagen,
            COALESCE(ROUND(AVG(v.puntuacion), 2), 0) as puntuacion,
            GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ';') AS categoria
        FROM servicio s
        LEFT JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        LEFT JOIN valoracion v ON e.experiencia_id = v.experiencia_id
        LEFT JOIN servicio_categoria sc ON sc.servicio_id = s.servicio_id
        LEFT JOIN categoria c ON c.categoria_id = sc.categoria_id
        WHERE s.estado = 'activo' AND s.tipo = 'producto'
        GROUP BY 
            s.nombre, 
            s.precio, 
            s.imagen,
            c.nombre
        ORDER BY s.nombre ASC;
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}