import { Request, Response } from 'express';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { updateGenericService } from '@/services/Dashboard/generic/updateGenericService';
import { deleteFromAzureService } from '@/services/Azure/deleteFromAzureService';
import { findByIdGenericService } from '@/services/Dashboard/generic/findByIdGenericService';

interface EntityConfig {
    imageField?: string;
    requiredFields?: string[];
    allowedFields?: string[];
    customValidations?: (data: any) => Promise<void>;
    customUpdates?: (data: any, entity: any) => Promise<void>;
}

const entityConfigs: { [key: string]: EntityConfig } = {
    emprendedores: {
        imageField: 'image',
        requiredFields: ['userId'],
        allowedFields: ['name', 'email', 'phone', 'name_experience', 'image'],
        customValidations: async (data: any) => {
            if (data.name_experience && !data.name_experience.trim()) {
                throw new Error('El nombre de la experiencia no puede estar vacío');
            }
        }
    },
    experiencias: {
        imageField: 'image',
        requiredFields: ['userId'],
        allowedFields: ['name', 'description', 'image', 'type', 'location']
    },
    categorias: {
        imageField: 'image',
        requiredFields: ['userId'],
        allowedFields: ['name', 'description', 'image']
    },
    paquetes: {
        imageField: 'image',
        
        allowedFields: ['package_id','name', 'description', 'image', 'pricePerPerson','duration','capacity','selectedDetails','selectedExperiences','unavailableDates']
    }
};

export const updateGenericController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, entityType } = req.params;
        if (!userId) {
            res.status(401).json({ error: 'Usuario no autenticado' });
            return;
        }

        const config = entityConfigs[entityType];
        if (!config) {
            res.status(400).json({ error: 'Tipo de entidad no soportado' });
            return;
        }

        const currentEntity = await findByIdGenericService(Number(userId), entityType);
        if (!currentEntity) {
            res.status(404).json({ error: 'Entidad no encontrada' });
            return;
        }

        const updateData: any = {
            userId: Number(userId),
            entityType
        };

        if (config.allowedFields) {
            Object.entries(req.body).forEach(([key, value]) => {
                if (config.allowedFields?.includes(key) && value !== undefined && value !== null) {
                    updateData[key] = typeof value === 'string' ? value.trim() : value;
                }
            });
        }


        if (req.file && config.imageField) {
            const imageUrl = await uploadToAzureService(req.file);
            if (imageUrl) {
                if (currentEntity[config.imageField]) {
                    try {
                        await deleteFromAzureService(currentEntity[config.imageField]);
                    } catch (error) {
                        console.error('Error deleting previous image:', error);
                    }
                }
                updateData[config.imageField] = imageUrl;
            }
        }


        if (config.requiredFields) {
            for (const field of config.requiredFields) {
                if (!updateData[field]) {
                    res.status(400).json({ error: `El campo ${field} es requerido` });
                    return;
                }
            }
        }

        if (config.customValidations) {
            await config.customValidations(updateData);
        }
        

        const changedFields = await updateGenericService(updateData);

        res.status(200).json({
            message: `${entityType} actualizado exitosamente`,
            updatedFields: changedFields
        });
    } catch (error: any) {
        console.error(`Error en updateGenericController para ${req.params.entityType}:`, error);
        res.status(500).json({ 
            error: error.message || `Error al actualizar ${req.params.entityType}` 
        });
    }
}; 