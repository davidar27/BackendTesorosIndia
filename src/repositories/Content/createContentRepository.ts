import db from "../../config/db";

export const createContentRepository = async (contentData: any) => {
    const { nombre, descripcion, ubicacion, emprendedor_id, images, videos } = contentData;

    const query = `
        INSERT INTO finca (nombre, descripcion, ubicacion, emprendedor_id, imagenes, videos) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        nombre || "Sin nombre",
        descripcion || "Sin descripción",
        ubicacion || null,
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
