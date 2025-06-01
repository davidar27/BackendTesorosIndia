import { Request, Response } from 'express';
import { getAllProductsService } from '@/services/Product/getAllProductsService';

export async function getAllProductsController(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.body.userId; 

        if (!userId) {
            res.status(403).json({ error: "Unauthorized: User ID is required" })
            return
        }

        const products = await getAllProductsService(userId);
        res.status(200).json(products);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al obtener los productos" });
    }
}
