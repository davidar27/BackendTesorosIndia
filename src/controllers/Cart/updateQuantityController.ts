import { Request, Response } from 'express';
import { updateQuantityCartService } from '@/services/Cart/updateQuantityCartService';

export const updateQuantityCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;
        const result = await updateQuantityCartService(userId, productId, quantity);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error || "Error al actualizar la cantidad.");
    }
};
