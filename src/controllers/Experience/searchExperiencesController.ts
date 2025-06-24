import { Request, Response } from 'express';
import { searchExperiencesService } from '@/services/Experience/searchExperiencesService';

export const searchExperiencesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { q } = req.query;
        
        // Validar que se proporcione el parámetro de búsqueda
        if (!q || typeof q !== 'string') {
            res.status(400).json({
                success: false,
                message: 'El parámetro de búsqueda "q" es requerido'
            });
            return;
        }

        const results = await searchExperiencesService(q);

        res.status(200).json({
            success: true,
            data: results,
            message: 'Búsqueda realizada con éxito'
        });

    } catch (error) {
        console.error('Error en searchExperiencesController:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al buscar experiencias'
        });
    }
}; 