import db from "@/config/db";

export const findByIdGenericService = async (
    id: number, 
    entityType: string
) => {
    let tableName: string;
    let idColumn: string;

    switch (entityType) {
        case 'emprendedores':
            tableName = 'usuario';
            idColumn = 'usuario_id';
            break;
        case 'experiencias':
            tableName = 'experiencia';
            idColumn = 'experiencia_id';
            break;
        case 'categorias':
            tableName = 'categoria';
            idColumn = 'categoria_id';
            break;
        case 'paquetes':
            tableName = 'servicio';
            idColumn = 'servicio_id';
            break;
        case 'cliente':
            tableName = 'usuario';
            idColumn = 'usuario_id';
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