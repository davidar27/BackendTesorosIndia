import { Request, Response } from 'express';
import { deleteProductService } from '@/services/Product/deleteProductService';

export async function deleteProductController(req: Request, res: Response): Promise<void> {
    try {
        const { product_id } = req.params;
        const entrepreneur_id = req.body.userId;

        await deleteProductService(Number(product_id), entrepreneur_id);

        res.status(200).json("Producto eliminado correctamente");
    } catch (error: any) {
        if (error.message === "El producto no existe o no pertenece al emprendedor.") {
            res.status(404).json({ error: error.message });
            return
        }
        res.status(400).json({ error: "Error al eliminar el producto" });
    }
}
