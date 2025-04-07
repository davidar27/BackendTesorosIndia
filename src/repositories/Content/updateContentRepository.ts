import db from "../../config/db";

export const updateContentRepository = async (contentData: any) => {
    const { id, nombre, description, ubicacion, images, videos } = contentData;

    const query = `
        UPDATE finca 
        SET nombre = ?, 
            descripcion = ?, 
            ubicacion = ?, 
            imagenes = ?, 
            videos = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND emprendedor_id = ?
    `;

    const values = [
        nombre,
        description,
        ubicacion,
        images,
        videos,
        id,
        contentData.emprendedor_id
    ];

    try {
        const [result]: any = await db.execute(query, values);
        
        if (result.affectedRows === 0) {
            throw new Error("No se encontró el contenido o no tienes permisos");
        }
        
        return result;
    } catch (error) {
        console.error("Error en updateContentRepository:", error);
        throw new Error("Error al actualizar contenido en la base de datos");
    }
};