import { Request, Response } from "express";
import { addProductCartService } from '@/services/Cart/addProductCartService';

export const addProductCartController = async (req: Request, res: Response) => {
    try {
        const { product_id, user_id } = req.body;
        const result = await addProductCartService(user_id, product_id);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error || "Error al agregar el producto al carrito.");
    }
};
