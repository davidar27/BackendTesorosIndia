import db from '@/config/db';

interface EntityMapping {
    [key: string]: {
        table: string;
        idField: string;
        fieldMappings: { [key: string]: string };
        relatedUpdates?: {
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
            experience_id: 'experiencia_id'
        },
        relatedUpdates: {
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
            image: 'imagen'
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
        table: 'servicio',
        idField: 'servicio_id',
        fieldMappings: {
            name: 'nombre',
            description: 'descripcion',
            image: 'imagen',
            price: 'precio'
        }
    }
};

export const updateGenericRepository = async (
    entity: any,
    changedFields: Record<string, any>,
    entityType: string
): Promise<void> => {
    if (Object.keys(changedFields).length === 0) return;
    
    const mapping = entityMappings[entityType];
    if (!mapping) {
        throw new Error(`Tipo de entidad no soportado: ${entityType}`);
    }

  

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const setClauses: string[] = [];
        const values: any[] = [];

        Object.entries(changedFields).forEach(([field, value]) => {
            if (field === 'userId' || field === 'entityType') return;
            
            const dbField = mapping.fieldMappings[field];
            
            if (dbField) {
                setClauses.push(`${dbField} = ?`);
                values.push(value);
            }
        });


        if (setClauses.length > 0) {
            const query = `UPDATE ${mapping.table} SET ${setClauses.join(', ')} WHERE ${mapping.idField} = ?`;            
            await connection.execute(query, [...values, entity[mapping.idField]]);
        }

        if (mapping.relatedUpdates) {
            const relatedSetClauses: string[] = [];
            const relatedValues: any[] = [];

            Object.entries(changedFields).forEach(([field, value]) => {
                const dbField = mapping.relatedUpdates?.fieldMappings[field];
                if (dbField) {
                    relatedSetClauses.push(`${dbField} = ?`);
                    relatedValues.push(value);
                }
            });

            if (relatedSetClauses.length > 0) {
                const relatedQuery = `
                    UPDATE ${mapping.relatedUpdates.table} 
                    SET ${relatedSetClauses.join(', ')} 
                    WHERE ${mapping.relatedUpdates.referenceField} = ?
                `;
                await connection.execute(relatedQuery, [...relatedValues, entity[mapping.idField]]);
            }
        }

        await connection.commit();
    } catch (error) {
        console.error('Error in updateGenericRepository:', error);
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}; 