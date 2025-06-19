import { Request, Response, NextFunction } from 'express';
import { getProductRepository } from '@/repositories/Cart/getProductRepository';

export const cartMiddleware: any = async (req: Request, res: Response, next: NextFunction) => {
    const { product_id, quantity } = req.body.productId || req.params.product_id;
    try {
        const product = await getProductRepository(product_id);
        if (product.length === 0) {
            return res.status(404).json({ error: 'El producto no existe.' });
        }
        const productData = product[0];
        if (quantity && quantity > productData.stock) {
            return res.status(400).json({ error: 'La cantidad solicitada excede el stock disponible.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error });
    }
};