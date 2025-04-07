import { Request, Response } from "express";
import { updateQuantityCartService } from "../../services/Cart/updateQuantityCartService";

export const updateQuantityController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log(userId);
        
        await updateQuantityCartService(userId, productId, quantity);
        res.status(200).send("Cantidad actualizada en el carrito!");
    } catch (error) {
        res.status(400).send(error || "Error al actualizar la cantidad.");
    }
};
