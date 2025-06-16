import db from '@/config/db';

interface EntityMapping {
    [key: string]: {
        table: string;
        idField: string;
        fieldMappings: { [key: string]: string };
        relatedCreates?: {
            table: string;
            idField: string;
            referenceField: string;
            fieldMappings: { [key: string]: string };
        };
    };
}

const entityMappings: EntityMapping = {
    emprendedores: {
        table: 'usuario',
        idField: 'usuario_id',
        fieldMappings: {
            name: 'nombre',
            email: 'correo',
            phone: 'telefono',
            image: 'imagen',
            role: 'rol'
        },
        relatedCreates: {
            table: 'experiencia',
            idField: 'experiencia_id',
            referenceField: 'emprendedor_id',
            fieldMappings: {
                name_experience: 'nombre'
            }
        }
    },
    experiencias: {
        table: 'experiencia',
        idField: 'experiencia_id',
        fieldMappings: {
            name: 'nombre',
            type: 'tipo',
            location: 'ubicacion',
            description: 'descripcion',
            image: 'logo'
        }
    },
    categorias: {
        table: 'categoria',
        idField: 'categoria_id',
        fieldMappings: {
            name: 'nombre',
            description: 'descripcion',
            image: 'imagen'
        }
    },
    paquetes: {
        table: 'paquete',
        idField: 'paquete_id',
        fieldMappings: {
            name: 'nombre',
            description: 'descripcion',
            image: 'imagen',
            price: 'precio'
        }
    }
};

export const createGenericRepository = async (data: any): Promise<Record<string, any>> => {
    const mapping = entityMappings[data.entityType];
    if (!mapping) {
        throw new Error(`Tipo de entidad no soportado: ${data.entityType}`);
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Preparar campos y valores para la entidad principal
        const fields: string[] = [];
        const values: any[] = [];
        const placeholders: string[] = [];

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'entityType') return; // Ignorar campo especial
            
            const dbField = mapping.fieldMappings[key];
            if (dbField) {
                fields.push(dbField);
                values.push(value);
                placeholders.push('?');
            }
        });

        // Insertar la entidad principal
        const query = `
            INSERT INTO ${mapping.table} 
            (${fields.join(', ')}) 
            VALUES (${placeholders.join(', ')})
        `;
        
        const [result] = await connection.execute(query, values);
        const insertId = (result as any).insertId;

        // Crear entidades relacionadas si existen
        if (mapping.relatedCreates) {
            const relatedFields: string[] = [];
            const relatedValues: any[] = [];
            const relatedPlaceholders: string[] = [];

            Object.entries(data).forEach(([key, value]) => {
                const dbField = mapping.relatedCreates?.fieldMappings[key];
                if (dbField) {
                    relatedFields.push(dbField);
                    relatedValues.push(value);
                    relatedPlaceholders.push('?');
                }
            });

            // Agregar el campo de referencia
            relatedFields.push(mapping.relatedCreates.referenceField);
            relatedValues.push(insertId);
            relatedPlaceholders.push('?');

            const relatedQuery = `
                INSERT INTO ${mapping.relatedCreates.table} 
                (${relatedFields.join(', ')}) 
                VALUES (${relatedPlaceholders.join(', ')})
            `;

            await connection.execute(relatedQuery, relatedValues);
        }

        await connection.commit();

        // Retornar la entidad creada
        return {
            id: insertId,
            ...data
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}; 