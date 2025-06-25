import { Request, Response } from 'express';
import { searchPackagesService } from '@/services/Package/searchPackagesService';

export const searchPackagesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { q, search } = req.query;
        const query = typeof q === 'string' ? q : typeof search === 'string' ? search : null;

        if (!query) {
            res.status(400).json({
                success: false,
                message: 'El parámetro de búsqueda "q" es requerido'
            });
            return;
        }

        const packages = await searchPackagesService(query);

        res.status(200).json({
            packages
        });

    } catch (error) {
        console.error('Error en searchPackagesController:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al buscar paquetes'
        });
    }
}; 