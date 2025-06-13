import { Request, Response } from 'express';
import { getEntitiesService } from '@/services/Dashboard/generic/getEntitiesService';

type EntityType = 'emprendedores' | 'experiencias' | 'categorias' | 'paquetes';

export const getEntitiesController = async (req: Request, res: Response): Promise<void> => {
    const { entityType } = req.params;

    if (!['emprendedores', 'experiencias', 'categorias', 'paquetes'].includes(entityType)) {
        res.status(400).json({ error: 'Tipo de entidad no válido' });
        return;
    }

    try {
        const entities = await getEntitiesService(entityType as EntityType);
        res.status(200).json(entities);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || `Error al obtener los ${entityType}`
        });
    }
};