import { Request, Response } from "express";
import { Product } from "../../models/Product/Product";
import { createProductService } from "../../services/Product/createProductService";

export async function createProductController(req: Request, res: Response): Promise<void> {
    try {
        const product: Product = {
            ...req.body,
            emprendedor_id: req.body.userId
        };

        const producto_id = await createProductService(product);
        res.status(201).json({ message: "Producto creado", producto_id });
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al crear el producto" });
    }
}


