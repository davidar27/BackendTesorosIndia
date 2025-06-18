import { Request, Response } from 'express';
import { getAllProductsService } from '@/services/Product/getAllProductsService';

export async function getAllProductsController(req: Request, res: Response): Promise<void> {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al obtener los productos" });
    }
}
