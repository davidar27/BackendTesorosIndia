import db from '@/config/db';

export const updateInfoExperienceRepository = async (ExperienceData: any) => {
    const { id, description, location, history, image, entrepreneur_id } = ExperienceData;
    const query = `
        UPDATE experiencia 
        SET
            descripcion = ?, 
            -- ubicacion = ?, 
            historia = ?, 
            imagen = ?
        WHERE experiencia_id = ? AND emprendedor_id = ?
    `;
    const values = [
        description,
        // location,
        history,
        image,
        id,
        entrepreneur_id
    ];
    try {
        const [result]: any = await db.execute(query, values);
        if (result.affectedRows === 0) {
            throw new Error("No se encontró el contenido o no tienes permisos");
        }
        return result;
    } catch (error) {
        console.error("Error en updateExperienceRepository:", error);
        throw new Error("Error al actualizar contenido en la base de datos");
    }
};