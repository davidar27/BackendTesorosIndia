import { Request, Response } from "express";
import { addProductCartService } from "../../services/Cart/addProductCartService";

export const addProductController = async (req: Request, res: Response): Promise<void> => {
    try {

        const cliente_id = req.body.userId        
        const { productId, quantity } = req.body;        
        await addProductCartService(cliente_id, productId, quantity);
        res.status(200).send("Producto agregado al carrito!");
    } catch (error) {
        res.status(400).send(error || "Error al agregar el producto al carrito.");
    }
};
