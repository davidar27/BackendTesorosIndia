import { Product } from "../../models/Product/Product";
import { updateProductRepository } from "../../repositories/Product/updateProductRepository";


export async function updateProductService(producto_id: number, product: Partial<Product>): Promise<void> {
  await updateProductRepository(producto_id, product);
}