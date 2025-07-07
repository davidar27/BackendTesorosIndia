import db from "@/config/db";

export const updateStatusExperienceRepository = async (experience_id: number, status: string) => {
    const query = `
        UPDATE experiencia
        SET
            estado = ?
        WHERE experiencia_id = ?
    `;
    const values = [status, experience_id];
    const [result] = await db.query(query, values) as any;
    return result;
}