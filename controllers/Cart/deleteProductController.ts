import { Request, Response } from "express";
import { deleteProductCartService } from "../../services/Cart/deleteProductCartService";

export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId } = req.body;
        await deleteProductCartService(userId, productId);
        res.status(200).send("Producto eliminado del carrito!");
    } catch (error) {
        res.status(400).send(error || "Error al eliminar el producto.");
    }
};
