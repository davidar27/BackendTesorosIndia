import { Product } from "@/models/Product/Product";
import { createProductRepository } from "@/repositories/Product/createProductRepository";

export async function createProductService(product: Product): Promise<Product> {
    const insertId = await createProductRepository(product);
    return { ...product, product_id: insertId };
}