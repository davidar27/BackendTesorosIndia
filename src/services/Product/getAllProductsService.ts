import { Product } from "@/models/Product/Product";
import { getAllProductsRepository } from "@/repositories/Product/getAllProductsRepository";

export async function getAllProductsService(userId : number): Promise<Product[]> {
  return await getAllProductsRepository(userId);
}