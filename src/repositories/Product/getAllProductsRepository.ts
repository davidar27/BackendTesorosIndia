import db from '@/config/db';
import { calculatePriceWithTax } from '@/helpers/price/calculatePriceWithTax';
import { Product } from '@/models/Product/Product';

export async function getAllProductsRepository(): Promise<Product[]> {
    const [rows] = await db.query(
        `
      SELECT 
            s.servicio_id AS id,
            s.nombre AS name,
            s.precio AS price,
            s.imagen AS image,
            s.stock,
            COALESCE(ROUND(AVG(v.puntuacion), 2), 0) as rating,
            GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ';') AS category,
            s.experiencia_id as experience_id
        FROM servicio s
        LEFT JOIN valoracion v ON s.servicio_id = v.producto_id
        LEFT JOIN servicio_categoria sc ON sc.servicio_id = s.servicio_id
        LEFT JOIN categoria c ON c.categoria_id = sc.categoria_id
        LEFT JOIN experiencia e ON e.experiencia_id = s.experiencia_id
        WHERE s.estado = 'activo' AND s.tipo = 'producto'
        GROUP BY 
            s.nombre, 
            s.precio, 
            s.imagen,
            c.nombre,
            s.servicio_id
        ORDER BY s.nombre ASC;
        `
    );

    const result = (rows as any[]).map(row => {
        const price = Number(row.price);
        return {
            ...row,
            price,
            priceWithTax: calculatePriceWithTax(price),
        };
    });

    return result;
}
