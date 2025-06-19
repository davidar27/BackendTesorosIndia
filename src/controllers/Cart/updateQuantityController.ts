import { Request, Response } from 'express';
import { updateQuantityCartService } from '@/services/Cart/updateQuantityCartService';

export const updateQuantityCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const result = await updateQuantityCartService(user_id, product_id, quantity);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error || "Error al actualizar la cantidad.");
    }
};
