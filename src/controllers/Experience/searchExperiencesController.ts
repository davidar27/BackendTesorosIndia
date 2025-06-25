import { Request, Response } from 'express';
import { searchExperiencesService } from '@/services/Experience/searchExperiencesService';

export const searchExperiencesController = async (req: Request, res: Response): Promise<void> => {
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

        const experiences = await searchExperiencesService(query);

        res.status(200).json({
           experiences
        });

    } catch (error) {
        console.error('Error en searchExperiencesController:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al buscar experiencias'
        });
    }
}; 