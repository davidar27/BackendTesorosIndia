import db from '@/config/db';

export const reportedReviewRepository = async (review_id: number, reporting_users:string) => {
    const sql = `
        UPDATE valoracion
        SET infringe_normas = infringe_normas + 1, usuarios_reportaron = ?
        WHERE valoracion_id = ?
    `;

    const [rows]: any = await db.execute(sql, [reporting_users, review_id]);
    return rows
}; 