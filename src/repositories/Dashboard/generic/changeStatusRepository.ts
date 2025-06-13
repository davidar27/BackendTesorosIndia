import db from "@/config/db";

export const changeStatusRepository = async (
    id: number,
    status: string,
    entityType: string
) => {
    let tableName: string;
    let idColumn: string;


    switch (entityType) {
        case 'entrepreneur':
            tableName = 'usuario';
            idColumn = 'usuario_id';
            break;
        case 'experience':
            tableName = 'experiencia';
            idColumn = 'experiencia_id';
            break;
        case 'category':
            tableName = 'categoria';
            idColumn = 'categoria_id';
            break;
        case 'package':
            tableName = 'paquete';
            idColumn = 'paquete_id';
            break;
        default:
            throw new Error('Tipo de entidad no válido');
    }

    try {
        const query = `UPDATE ${tableName} SET estado = ? WHERE ${idColumn} = ?`;
        await db.query(query, [status, id]);
    } catch (error: any) {
        console.error("Database error:", error);
        throw new Error(`Error al actualizar el estado: ${error.message}`);
    }
};