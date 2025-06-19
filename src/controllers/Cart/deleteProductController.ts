import { Request, Response } from 'express';
import { deleteProductCartService } from '@/services/Cart/deleteProductCartService';

export const deleteProductCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, product_id } = req.body;
        const result = await deleteProductCartService(user_id, product_id);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error || "Error al eliminar el producto.");
    }
};
