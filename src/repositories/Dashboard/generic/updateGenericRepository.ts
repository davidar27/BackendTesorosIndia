import db from '@/config/db';

interface EntityMapping {
    [key: string]: {
        table: string;
        idField: string;
        fieldMappings: { [key: string]: string };
        relatedUpdates?: Array<{
            table: string;
            idField: string;
            referenceField: string;
            fieldMappings: { [key: string]: string };
            arrayField?: string;
        }>;
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
        relatedUpdates: [
            {
                table: 'experiencia',
                idField: 'experiencia_id',
                referenceField: 'emprendedor_id',
                fieldMappings: {
                    name_experience: 'nombre'
                }
            }
        ]
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
            pricePerPerson: 'precio',
            unavailableDates: 'fechas_no_disponibles',
            duration: 'duracion',
            capacity: 'capacidad'
        },
        relatedUpdates: [
            {
                table: 'experiencia_paquete',
                idField: 'experiencia_paquete_id',
                referenceField: 'paquete_id',
                fieldMappings: {
                    experiencia_id: 'experiencia_id'
                },
                arrayField: 'selectedExperiences'
            },
            {
                table: 'servicio_detalle',
                idField: 'detalle_id',
                referenceField: 'servicio_id',
                fieldMappings: {
                    detalle_id: 'detalle_id'
                },
                arrayField: 'selectedDetails'
            }
        ]
    }
}

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

        if (Array.isArray(mapping.relatedUpdates)) {
            for (const related of mapping.relatedUpdates) {
                if (related.arrayField && Array.isArray(changedFields[related.arrayField])) {
                    await connection.execute(
                        `DELETE FROM ${related.table} WHERE ${related.referenceField} = ?`,
                        [entity[mapping.idField]]
                    );
                    const fieldKeys = Object.keys(related.fieldMappings);
                    const dbFields = [related.referenceField, ...fieldKeys.map(key => related.fieldMappings[key])];
                    for (const item of changedFields[related.arrayField]) {
                        let values;
                        if (typeof item === 'object' && item !== null) {
                            values = [entity[mapping.idField], ...fieldKeys.map(key => item[key] ?? null)];
                        } else {
                            values = [entity[mapping.idField], item ?? null];
                        }
                        if (values.some(v => v === undefined)) {
                            throw new Error(`Intentando insertar un valor undefined en ${related.table}: ${JSON.stringify(values)}`);
                        }
                        await connection.execute(
                            `INSERT INTO ${related.table} (${dbFields.join(', ')}) VALUES (${dbFields.map(() => '?').join(', ')})`,
                            values
                        );
                    }
                } else {
                    const relatedSetClauses: string[] = [];
                    const relatedValues: any[] = [];

                    Object.entries(changedFields).forEach(([field, value]) => {
                        const dbField = related.fieldMappings[field];
                        if (dbField) {
                            relatedSetClauses.push(`${dbField} = ?`);
                            relatedValues.push(value);
                        }
                    });

                    if (relatedSetClauses.length > 0) {
                        const relatedQuery = `
                            UPDATE ${related.table} 
                            SET ${relatedSetClauses.join(', ')} 
                            WHERE ${related.referenceField} = ?
                        `;
                        await connection.execute(relatedQuery, [...relatedValues, entity[mapping.idField]]);
                    }
                }
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