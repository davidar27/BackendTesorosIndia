import db from '@/config/db';

type EntityConfig = {
    table: string;
    idColumn: string;
    imageColumn?: string;
    extraJoins?: string;
    extraFields?: string;
    defaultOrder?: string;
};

const ENTITY_CONFIGS: Record<string, EntityConfig> = {
    emprendedores: {
        table: 'usuario',
        idColumn: 'usuario_id',
        imageColumn: 'imagen',
        extraJoins: 'LEFT JOIN experiencia ON usuario.usuario_id = experiencia.emprendedor_id',
        extraFields: 'experiencia.nombre AS name_experience, usuario.correo AS email, usuario.telefono AS phone',
        defaultOrder: 'usuario.fecha_registro DESC'
    },
    experiencias: {
        table: 'experiencia',
        idColumn: 'experiencia_id',
        imageColumn: 'logo',
        defaultOrder: 'experiencia.fecha_registro DESC'
    },
    categorias: {
        table: 'categoria',
        idColumn: 'categoria_id',
        extraFields: '(SELECT COUNT(*) FROM servicio_categoria sc WHERE sc.categoria_id = categoria.categoria_id) as productsCount',
        defaultOrder: 'categoria.fecha_registro DESC'
    },
    
    // Añadir más configuraciones según necesites
};

export const getEntitiesRepository = async (entityType: string): Promise<any[]> => {
    const config = ENTITY_CONFIGS[entityType];
    if (!config) throw new Error(`Tipo de entidad no soportado: ${entityType}`);

    const sql = `
        SELECT 
            ${config.table}.${config.idColumn} AS id,
            ${config.table}.nombre AS name,
            ${config.imageColumn ? `${config.table}.${config.imageColumn} AS image,` : ''}
            ${config.extraFields || ''}
            ${config.extraFields ? ',' : ''}
            DATE_FORMAT(${config.table}.fecha_registro, '%d/%m/%Y') AS joinDate,
            ${config.table}.estado AS status
        FROM ${config.table}
        ${config.extraJoins || ''}
        ${entityType === 'emprendedores' ? "WHERE usuario.rol = 'emprendedor'" : ''}
        ORDER BY ${config.defaultOrder || 'id DESC'}
    `;

    const [rows]: any = await db.execute(sql);
    return rows;
};