import { Request, Response } from "express";
import { addProductCartService } from '@/services/Cart/addProductCartService';

export const addProductCartController = async (req: Request, res: Response) => {
    try {
        const { productId, userId } = req.body;
        const result = await addProductCartService(userId, productId);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error || "Error al agregar el producto al carrito.");
    }
};
