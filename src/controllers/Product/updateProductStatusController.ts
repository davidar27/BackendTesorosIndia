import { Request, Response } from 'express';
import { updateProductStatusService } from '@/services/Product/updateProductStatusService';

export async function updateProductStatusController(req: Request, res: Response): Promise<void> {
    try {
        const { product_id } = req.params;

        await updateProductStatusService(Number(product_id));

        res.status(200).json("Producto desactivado correctamente");
    } catch (error: any) {
        if (error.message === "El producto no existe o no pertenece al emprendedor.") {
            res.status(404).json({ error: error.message });
            return
        }
        res.status(400).json({ error: "Error al desactivar el producto" });
    }
} 