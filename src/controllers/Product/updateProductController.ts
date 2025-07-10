import { Request, Response } from 'express';
import { Product } from '@/models/Product/Product';
import { updateProductService } from '@/services/Product/updateProductService';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';

export async function updateProductController(req: Request, res: Response): Promise<void> {
    try {
        const { product_id, experience_id } = req.params;
        const { name, description, price, stock, category_id } = req.body;
        
        const product: Partial<Product> = {
            experience_id: Number(experience_id)
        };

        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;
        if (category_id !== undefined) product.category_id = category_id;

        const image: any = req.file;
        if (image) {
            const imageUrl = await uploadToAzureService(image);
            product.image = imageUrl || undefined;
        }

        await updateProductService(Number(product_id), product as Product);
        res.status(200).json("Producto actualizado");
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al actualizar el producto" });
    }
}