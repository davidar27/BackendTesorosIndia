import { Request, Response } from 'express';
import { Product } from '@/models/Product/Product';
import { updateProductService } from '@/services/Product/updateProductService';

export async function updateProductController(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const productUpdates: Partial<Product> = req.body;
        await updateProductService(Number(id), productUpdates);
        res.status(200).json({ message: "Producto actualizado" });
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al actualizar el producto" });
    }
}