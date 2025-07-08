import { Request, Response } from 'express';
import { Product } from '@/models/Product/Product';
import { updateProductService } from '@/services/Product/updateProductService';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';

export async function updateProductController(req: Request, res: Response): Promise<void> {
    try {
        const { product_id, experience_id } = req.params;
        const { name, description, price, stock, userId: user_id, category_id } = req.body
        const product: Product = {
            name: name,
            description: description,
            price: price,
            stock: stock,
            entrepreneur_id: user_id,
            category_id: category_id,
            experience_id: Number(experience_id)
        };

        const image: any = req.file;
        let imageUrl: any;
        if (image) {
            imageUrl = await uploadToAzureService(image);
            product.image = imageUrl
        }

        await updateProductService(Number(product_id), product);
        res.status(200).json("Producto actualizado");
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al actualizar el producto" });
    }
}