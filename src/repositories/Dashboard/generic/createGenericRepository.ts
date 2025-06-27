import db from '@/config/db';

type RelatedTable = {
    table: string;
    idField: string;
    referenceField: string;
    fieldMappings: { [key: string]: string };
    arrayField?: string; // Para campos que contienen arrays
};

type EntityConfig = {
    table: string;
    idColumn: string;
    imageColumn?: string;
    fieldMappings: { [key: string]: string };
    selectFields?: string[];
    extraJoins?: string;
    extraFields?: string;
    relatedTables?: RelatedTable[];
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
        table: 'servicio',
        idColumn: 'servicio_id',
        imageColumn: 'imagen',
        fieldMappings: {
            name: 'nombre',
            description: 'descripcion',
            image: 'imagen',
            pricePerPerson: 'precio',
            duration: 'duracion',
            capacity: 'capacidad',
            unavailableDates: 'fechas_no_disponibles',
            tipo: 'tipo'
        },
        selectFields: [
            'servicio.servicio_id As id',
            'servicio.nombre As name',
            'servicio.descripcion As description',
            'servicio.imagen As image',
            'servicio.precio As price',
            'servicio.duracion As duration',
            'servicio.capacidad As capacity',
            'servicio.fechas_no_disponibles As unavailableDates',
            'servicio.tipo As type'
        ],
        extraJoins: 'LEFT JOIN experiencia_paquete ON servicio.servicio_id = experiencia_paquete.paquete_id LEFT JOIN servicio_detalle ON servicio.servicio_id = servicio_detalle.servicio_id',
        extraFields: 'experiencia_paquete.experiencia_id As experience_id, experiencia_paquete.paquete_id As package_id,servicio_detalle.servicio_id As service_id, servicio_detalle.detalle_id As detail_id',
        relatedTables: [
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

        // Insertar en la tabla principal
        const fields: string[] = [];
        const values: any[] = [];
        const placeholders: string[] = [];

        if (data.entityType === 'emprendedores') {
            data.status = 'inactivo';
            data.role = 'emprendedor';
            data.verified = data.verified || false;
        }

        if (data.entityType === 'paquetes') {
            data.tipo = 'paquete';
        }

        // Filtrar campos que van a la tabla principal (excluyendo arrays para tablas relacionadas)
        const mainTableData: any = {};
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'entityType') return;
            
            // Verificar si este campo es un array para tablas relacionadas
            const isRelatedArray = config.relatedTables?.some(related => related.arrayField === key);
            if (!isRelatedArray) {
                mainTableData[key] = value;
            }
        });

        Object.entries(mainTableData).forEach(([key, value]) => {
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

        // Insertar en tablas relacionadas si existen
        if (config.relatedTables) {
            for (const relatedTable of config.relatedTables) {
                const arrayField = relatedTable.arrayField;
                if (arrayField && data[arrayField]) {
                    let arrayValues = data[arrayField];
                    if (typeof arrayValues === 'string') {
                        try {
                            arrayValues = JSON.parse(arrayValues);
                        } catch (e) {
                            continue;
                        }
                    }
                    
                    if (Array.isArray(arrayValues)) {
                        for (const arrayValue of arrayValues) {
                            const relatedFields: string[] = [];
                            const relatedValues: any[] = [];
                            const relatedPlaceholders: string[] = [];

                            // Agregar el campo de referencia (ID de la tabla principal)
                            relatedFields.push(relatedTable.referenceField);
                            relatedValues.push(insertId);
                            relatedPlaceholders.push('?');

                            // Agregar el valor del array
                            const fieldMapping = relatedTable.fieldMappings[Object.keys(relatedTable.fieldMappings)[0]];
                            if (fieldMapping) {
                                relatedFields.push(fieldMapping);
                                relatedValues.push(arrayValue);
                                relatedPlaceholders.push('?');
                            }

                            const relatedQuery = `
                                INSERT INTO ${relatedTable.table} 
                                (${relatedFields.join(', ')}) 
                                VALUES (${relatedPlaceholders.join(', ')})
                            `;

                            console.log('Executing related query:', relatedQuery, 'with values:', relatedValues);
                            await connection.execute(relatedQuery, relatedValues);
                        }
                    }
                }
            }
        }

        await connection.commit();

        // Obtener la entidad creada con datos relacionados
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

            // Agregar arrays de datos relacionados si existen
            if (config.relatedTables) {
                for (const relatedTable of config.relatedTables) {
                    const arrayField = relatedTable.arrayField;
                    if (arrayField && data[arrayField]) {
                        createdEntity[arrayField] = data[arrayField];
                    }
                }
            }
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