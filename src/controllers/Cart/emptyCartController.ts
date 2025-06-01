import { Request, Response } from 'express';
import { emptyCartService } from '@/services/Cart/emptyCartService';

export const emptyCartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;
        await emptyCartService(userId);
        res.status(200).send("Carrito vacío!");
    } catch (error) {
        res.status(400).send(error || "Error al vaciar el carrito.");
    }
};
