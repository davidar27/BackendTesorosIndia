import db from "../../config/db";

export const deleteContentRepository = async (finca_id: number, emprendedor_id: number) => {
    const query = `
        DELETE FROM finca 
        WHERE finca_id = ? AND emprendedor_id = ?
    `;
        console.log(finca_id);
        
    const values = [finca_id, emprendedor_id];

    try {
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error("Error en deleteContentRepository:", error);
        throw new Error("Error al eliminar contenido de la base de datos");
    }
};