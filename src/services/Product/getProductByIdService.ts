import { Product } from "@/models/Product/Product";
import { getProductByIdRepository } from "@/repositories/Product/getProductByIdRepository";


export async function getProductByIdService(producto_id: number): Promise<Product | null> {
  return await getProductByIdRepository(producto_id);
}