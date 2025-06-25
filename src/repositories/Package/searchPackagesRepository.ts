import db from '@/config/db';

export interface SearchPackageResult {
    id: number;
    name_package: string;
}

export const searchPackagesRepository = async (searchTerm: string): Promise<SearchPackageResult[]> => {
    const sql = `
        SELECT 
            servicio_id AS id, 
            nombre AS name_package,
            tipo as type,
            imagen as image
        FROM servicio 
        WHERE estado = 'activo' 
        AND tipo = 'paquete'
        AND nombre LIKE ? 
        ORDER BY nombre ASC
        LIMIT 20
    `;

    const searchPattern = `%${searchTerm}%`;
    const [rows]: any = await db.execute(sql, [searchPattern]);
    return rows;
}; 