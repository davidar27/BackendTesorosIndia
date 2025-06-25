import { Request, Response } from 'express';
import { deleteProductCartService } from '@/services/Cart/deleteProductCartService';

export const deleteProductCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId } = req.body;
        const result = await deleteProductCartService(userId, productId);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error || "Error al eliminar el producto.");
    }
};
