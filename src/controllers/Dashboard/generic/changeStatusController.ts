import { Request, Response } from 'express';
import { changeStatusService } from '@/services/Dashboard/generic/changeStatusService';

export type EntityType = 'emprendedores' | 'experiencias' | 'categorias' | 'paquetes';
export type Status = 'activo' | 'inactivo' | 'pendiente';

export const changeStatusController = async (req: Request, res: Response) => {
    const { id, entityType } = req.params;        
    const { status } = req.body; 
    const statusEnum = {
        active: 'activo',
        inactive: 'inactivo',
        pending: 'pendiente'
    }
    const mappedStatus = statusEnum[status as keyof typeof statusEnum];

    if (!mappedStatus) {
        return res.status(400).json({ message: 'Estado no válido' });
    }

    try {
        const updated = await changeStatusService(Number(id), mappedStatus as Status, entityType as EntityType);
        return res.status(200).json(updated);
    } catch (error: any) {
        if (error.message.includes('Data truncated')) {
            return res.status(400).json({ message: 'El estado debe ser uno de: activo, inactivo, pendiente' });
        }
        return res.status(400).json({ message: error.message });
    }
};