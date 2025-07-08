import { Product } from "@/models/Product/Product";
import { createProductRepository } from "@/repositories/Product/createProductRepository";

export async function createProductService(product: Product): Promise<boolean> {
    const result = await createProductRepository(product);
    return result ? true : false
}