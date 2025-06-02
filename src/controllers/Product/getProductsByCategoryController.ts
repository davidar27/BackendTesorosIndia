import { Request, Response } from 'express';
import { getProductsByCategoryService } from '@/services/Product/getProductsByCategoryService';

export const getProductsByCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = Number(req.params.categoryId);
        const products = await getProductsByCategoryService(categoryId);
        
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los productos por categoría" 
        });
    }
}; 