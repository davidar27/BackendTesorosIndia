import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export async function getAllProductsRepository(): Promise<Product[]> {
    const sql = `
        SELECT 
            s.servicio_id AS id,
            s.nombre AS name,
            CONCAT(FORMAT(precio, 0, "es_CO")) as price,
            s.imagen AS image,
            COALESCE(ROUND(AVG(v.puntuacion), 2), 0) as rating,
            GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ';') AS category
        FROM servicio s
        LEFT JOIN valoracion v ON s.servicio_id = v.producto_id
        LEFT JOIN servicio_categoria sc ON sc.servicio_id = s.servicio_id
        LEFT JOIN categoria c ON c.categoria_id = sc.categoria_id
        WHERE s.estado = 'activo' AND s.tipo = 'producto'
        GROUP BY 
            s.nombre, 
            s.precio, 
            s.imagen,
            c.nombre,
            s.servicio_id
        ORDER BY s.nombre ASC;
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}