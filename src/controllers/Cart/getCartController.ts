import { Request, Response } from 'express';
import { getCartService } from '@/services/Cart/getCartService';

export const getCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.body;
        const cart = await getCartService(user_id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).send(error || "Error al consultar el carrito.");
    }
};
