import db from '@/config/db';

export interface SearchProductResult {
    id: number;
    name_product: string;
}

export const searchProductsRepository = async (searchTerm: string): Promise<SearchProductResult[]> => {
    const sql = `
        SELECT 
            servicio_id AS id, 
            nombre AS name_product,
            imagen as image
        FROM servicio 
        WHERE estado = 'activo' 
        AND tipo = 'producto'
        AND nombre LIKE ? 
        ORDER BY nombre ASC
        LIMIT 20
    `;
    
    const searchPattern = `%${searchTerm}%`;
    const [rows]: any = await db.execute(sql, [searchPattern]);
    return rows;
}; 