import db from "@/config/db";

export const findByIdGenericService = async (
    id: number, 
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

    const [rows]: any = await db.query(
        `SELECT * FROM ${tableName} WHERE ${idColumn} = ?`,
        [id]
    );

    return rows[0];
};