import db from '@/config/db';

export const getDashboardStatsRepository = async () => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM finca) as total_farms,
            (SELECT COUNT(*) FROM usuario WHERE rol = 'emprendedor') as total_entrepreneurs,
            (SELECT COUNT(*) FROM paquete) as total_packages,
            (SELECT COUNT(*) FROM categoria) as total_categories
    `;
    const [rows]: any = await db.execute(sql);
    return rows[0];
}; 