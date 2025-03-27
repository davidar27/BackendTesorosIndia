import { Request, Response } from "express";
import { addProductCartService } from "../../services/Cart/addProductCartService";

export const addProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;
        await addProductCartService(userId, productId, quantity);
        res.status(200).send("Producto agregado al carrito!");
    } catch (error) {
        res.status(400).send(error || "Error al agregar el producto al carrito.");
    }
};
