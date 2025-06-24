import db from '@/config/db';

export interface SearchExperienceResult {
    id: number;
    name_experience: string;
}

export const searchExperiencesRepository = async (searchTerm: string): Promise<SearchExperienceResult[]> => {
    const sql = `
        SELECT 
            experiencia_id AS id, 
            nombre AS name_experience 
        FROM experiencia 
        WHERE estado = 'publicada' 
        AND nombre LIKE ? 
        ORDER BY nombre ASC
        LIMIT 20
    `;
    
    const searchPattern = `%${searchTerm}%`;
    const [rows]: any = await db.execute(sql, [searchPattern]);
    return rows;
}; 