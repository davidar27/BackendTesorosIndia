import { Request, Response } from 'express';
import { getProductByIdService } from '@/services/Product/getProductByIdService';

export async function getProductByIdController(req: Request,res: Response): Promise<void> { 
    try {
        const productId = Number(req.params.id);
        const product = await getProductByIdService(productId);

        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        res.status(200).json(product);
    } catch (error: unknown) { 
        const statusCode = error instanceof Error ? 500 : 400;
        const message = error instanceof Error ? error.message : "Error al obtener el producto";

        res.status(statusCode).json({ error: message });
    }
}