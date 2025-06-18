import { Request, Response } from 'express';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { createGenericService } from '@/services/Dashboard/generic/createGenericService';

interface EntityConfig {
    imageField?: string;
    requiredFields?: string[];
    allowedFields?: string[];
    customValidations?: (data: any) => Promise<void>;
    defaultValues?: { [key: string]: any };
}

const entityConfigs: { [key: string]: EntityConfig } = {
    emprendedores: {
        imageField: 'imagen',
        requiredFields: ['name', 'email', 'phone', 'name_experience', 'password'],
        allowedFields: ['name', 'email', 'phone', 'name_experience', 'password','image','joinDate','status','verified'],
        defaultValues: {
            role: 'emprendedor',
            verified: true,
            status: 'inactive'
        },
        customValidations: async (data: any) => {
            if (!data.name_experience?.trim()) {
                throw new Error('El nombre de la experiencia es requerido');
            }
        }
    },
    experiencias: {
        imageField: 'logo',
        requiredFields: ['name', 'type', 'location'],
        allowedFields: ['name', 'description', 'logo', 'type', 'location']
    },
    categorias: {
        imageField: 'image',
        requiredFields: ['name'],
        allowedFields: ['name', 'description', 'image']
    },
    paquetes: {
        imageField: 'image',
        requiredFields: ['name', 'price'],
        allowedFields: ['name', 'description', 'image', 'price']
    }
};

export const createGenericController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { entityType } = req.params;

        if (!entityType) {
            res.status(400).json({ error: 'Tipo de entidad no especificado' });
            return;
        }

        const config = entityConfigs[entityType];
        if (!config) {
            res.status(400).json({ error: 'Tipo de entidad no soportado' });
            return;
        }

        const createData: any = {
            entityType
        };

        if (config.defaultValues) {
            Object.assign(createData, config.defaultValues);
        }

        if (config.allowedFields) {
            Object.entries(req.body).forEach(([key, value]) => {
                if (config.allowedFields?.includes(key) && value !== undefined) {
                    if (key === config.imageField && typeof value === 'string') {
                        if (!value.startsWith('/images/')) {
                            value = `/images/${value}`;
                        }
                    }
                    createData[key] = typeof value === 'string' ? value.trim() : value;
                }
            });
        }

        if (req.file && config.imageField) {
            const imageUrl = await uploadToAzureService(req.file);

            if (imageUrl) {
                if (!imageUrl.startsWith('/images/')) {
                    createData[config.imageField] = `/images/${imageUrl}`;
                } else {
                    createData[config.imageField] = imageUrl;
                }
            }
        }

        if (config.requiredFields) {
            for (const field of config.requiredFields) {
                if (!createData[field]) {
                    res.status(400).json({ error: `El campo ${field} es requerido` });
                    return;
                }
            }
        }

        if (config.customValidations) {
            await config.customValidations(createData);
        }

        const entity = await createGenericService(createData);

        res.status(201).json(entity);
    } catch (error: any) {
        console.error(`Error en createGenericController para ${req.params.entityType}:`, error);
        res.status(500).json({ 
            error: error.message || `Error al crear ${req.params.entityType}` 
        });
    }
}; 