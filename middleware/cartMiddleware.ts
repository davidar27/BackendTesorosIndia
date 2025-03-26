import { Request, Response, NextFunction } from 'express';
import { CartRepository } from '../repositories/cartRepository';

export const cartMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.body.productId || req.params.productId;
    const quantity = req.body.quantity;

    try {
        // Llamado al repositorio para la verificación de existencia
        const product = await CartRepository.getProduct(productId);

        if (product.length === 0) {
            return res.status(404).json({ error: 'El producto no existe.' });
        }

        const productData = product[0];

        // Validación de stock
        if (quantity && quantity > productData.stock) {
            return res.status(400).json({ error: 'La cantidad solicitada excede el stock disponible.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error });
    }
};