import { Request, Response } from 'express';
import { Product } from '@/models/Product/Product';
import { createProductService } from '@/services/Product/createProductService';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';

export async function createProductController(req: Request, res: Response): Promise<void> {
    try {
        const { experience_id } = req.params
        const { userId: user_id, name, description, price, stock, category_id } = req.body
        const product: Product = {
            name: name,
            description: description,
            price: price,
            stock: stock,
            entrepreneur_id: user_id,
            category_id: category_id,
            experience_id: parseInt(experience_id)
        };

        const image: any = req.file;
        let imageUrl: any;
        if (image) {
            imageUrl = await uploadToAzureService(image);
            product.image = imageUrl
        } else {
            res.status(201).json("Imagen de producto no enviada");
            return
        }

        const result = await createProductService(product);
        if (result) {
            res.status(201).json(result);
            return
        }
        res.status(400).json("El producto no se ha podido crear");
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al crear el producto" });
    }
}


