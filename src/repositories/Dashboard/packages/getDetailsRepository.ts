import db from '@/config/db';

export const getDetailsRepository = async () => {
    const sql = `
        SELECT 
        detalle_id as detail_id,
		d.descripcion AS description
        FROM detalle d;
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 