import { Product } from "@/models/Product/Product";
import { createProductRepository } from "@/repositories/Product/createProductRepository";


export async function createProductService(product: Product): Promise<number> {
    return await createProductRepository(product);
}