import db from '@/config/db';

export const deleteExperienceRepository = async (experiencie_id: number, emprendedor_id: number) => {
    const query = `
        DELETE FROM experiencia 
        WHERE experiencia_id = ? AND emprendedor_id = ?
    `;
        
    const values = [experiencie_id, emprendedor_id];

    try {
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error("Error en deleteExperienceRepository:", error);
        throw new Error("Error al eliminar contenido de la base de datos");
    }
};