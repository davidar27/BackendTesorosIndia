import db from '@/config/db';

type EntityConfig = {
    table: string;
    idColumn: string;
    imageColumn?: string;
    fieldMappings: { [key: string]: string };
    selectFields?: string[];
    extraJoins?: string;
    extraFields?: string;
    relatedCreates?: {
        table: string;
        idField: string;
        referenceField: string;
        fieldMappings: { [key: string]: string };
    };
};

const ENTITY_CONFIGS: Record<string, EntityConfig> = {
    emprendedores: {
        table: 'usuario',
        idColumn: 'usuario_id',
        imageColumn: 'imagen',
        fieldMappings: {
            name: 'nombre',
            email: 'correo',
            phone: 'telefono',
            role: 'rol',
            password: 'contraseña',
            verified: 'verificado',
            status: 'estado',
            experience_id: 'experiencia_id'
        },
        selectFields: [
            'usuario.usuario_id As id',
            'usuario.nombre As name',
            'usuario.correo As email',
            'usuario.telefono As phone',
            'usuario.imagen As image',
            'usuario.estado As status',
            'usuario.experiencia_id As experience_id',
            "DATE_FORMAT(usuario.fecha_registro, '%d/%m/%Y') AS joinDate"
        ],
        extraJoins: 'LEFT JOIN experiencia ON usuario.experiencia_id = experiencia.experiencia_id',
        extraFields: 'experiencia.nombre As name_experience'
    },
    experiencias: {
        table: 'experiencia',
        idColumn: 'experiencia_id',
        imageColumn: 'imagen',
        fieldMappings: {
            name: 'nombre',
            type: 'tipo',
            location: 'ubicacion',
            description: 'descripcion',
            image: 'imagen'
        },
        selectFields: [
            'experiencia.experiencia_id As id',
            'experiencia.nombre As name',
            'experiencia.tipo As type',
            'experiencia.ubicacion As location',
            'experiencia.descripcion As description',
            'experiencia.imagen As image',
            "DATE_FORMAT(experiencia.fecha_registro, '%d/%m/%Y') AS joinDate"
        ]
    },
    categorias: {
        table: 'categoria',
        idColumn: 'categoria_id',
        imageColumn: 'imagen',
        fieldMappings: {
            name: 'nombre',
            description: 'descripcion',
            image: 'imagen'
        },
        selectFields: [
            'categoria.categoria_id As id',
            'categoria.nombre As name',
            'categoria.descripcion As description',
            'categoria.imagen As image',
            "DATE_FORMAT(categoria.fecha_registro, '%d/%m/%Y') AS joinDate"
        ]
    },
    paquetes: {
        table: 'paquete',
        idColumn: 'paquete_id',
        imageColumn: 'imagen',
        fieldMappings: {
            name: 'nombre',
            description: 'descripcion',
            image: 'imagen',
            price: 'precio'
        },
        selectFields: [
            'paquete.paquete_id As id',
            'paquete.nombre As name',
            'paquete.descripcion As description',
            'paquete.imagen As image',
            'paquete.precio As price',
            "DATE_FORMAT(paquete.fecha_registro, '%d/%m/%Y') AS joinDate"
        ]
    },
    
};
export const createGenericRepository = async (data: any): Promise<Record<string, any>> => {
    const config = ENTITY_CONFIGS[data.entityType];
    if (!config) {
        throw new Error(`Tipo de entidad no soportado: ${data.entityType}`);
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const fields: string[] = [];
        const values: any[] = [];
        const placeholders: string[] = [];

        if (data.entityType === 'emprendedores') {
            data.status = 'inactivo';
            data.role = 'emprendedor';
            data.verified = data.verified || false;
        }

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'entityType') return;
            
            const dbField = config.fieldMappings[key];
            if (dbField) {
                fields.push(dbField);
                values.push(value);
                placeholders.push('?');
            }
        });

        const query = `
            INSERT INTO ${config.table} 
            (${fields.join(', ')}) 
            VALUES (${placeholders.join(', ')})
        `;
        
        const [result] = await connection.execute(query, values);
        const insertId = (result as any).insertId;

        await connection.commit();

        let createdEntity;
        if (config.selectFields) {
            const selectQuery = `
                SELECT ${config.selectFields.join(', ')}
                ${config.extraFields ? `, ${config.extraFields}` : ''}
                FROM ${config.table}
                ${config.extraJoins || ''}
                WHERE ${config.table}.${config.idColumn} = ?
            `;

            const [rows] = await connection.execute(selectQuery, [insertId]);
            createdEntity = (rows as any[])[0];
        } else {
            createdEntity = {
                id: insertId,
                ...data
            };
        }

        return createdEntity;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}; 