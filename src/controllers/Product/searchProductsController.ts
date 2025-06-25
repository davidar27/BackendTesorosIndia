import { Request, Response } from 'express';
import { searchProductsService } from '@/services/Product/searchProductsService';

export const searchProductsController = async (req: Request, res: Response): Promise<void> => {
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

        const products = await searchProductsService(query);

        res.status(200).json({
            products
        });

    } catch (error) {
        console.error('Error en searchProductsController:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al buscar productos'
        });
    }
}; 