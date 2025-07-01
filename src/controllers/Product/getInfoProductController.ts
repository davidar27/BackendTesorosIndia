import { Request, Response } from 'express';
import { getInfoProductService } from '@/services/Product/getInfoProductService';

export const getInfoProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id } = req.params;
        const infoProduct = await getInfoProductService(parseInt(product_id));
        res.status(200).json(infoProduct);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener la informacion del producto"
        });
    }
}; 