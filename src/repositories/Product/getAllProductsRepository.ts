import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export async function getAllProductsRepository(): Promise<Product[]> {
    const sql = `
        SELECT 
            s.nombre,
            s.precio,
            s.imagen,
            COALESCE(ROUND(AVG(v.puntuacion), 2), 0) as puntuacion
        FROM servicio s
        LEFT JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        LEFT JOIN valoracion v ON e.experiencia_id = v.experiencia_id
        WHERE s.estado = 'activo' AND s.tipo = 'producto'
        GROUP BY 
            s.nombre, 
            s.precio, 
            s.imagen
        ORDER BY s.nombre ASC;
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}