import db from "../../config/db";

export const createContentRepository = async (contentData: any) => {
    const { title, description, emprendedor_id, images, videos } = contentData;

    const query = `
        INSERT INTO contenido (titulo, descripcion, emprendedor_id, imagenes, videos) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        title || "Sin título",
        description || "Sin descripción",
        emprendedor_id || 0, 
        images || null,
        videos || null
    ];

    try {
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error("Error en createContentRepository:", error);
        throw new Error("Error al insertar contenido en la base de datos");
    }
};
