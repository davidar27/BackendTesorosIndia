import { Product } from "@/models/Product/Product";
import { getAllProductsRepository } from "@/repositories/Product/getAllProductsRepository";

export async function getAllProductsService(): Promise<Product[]> {
  return await getAllProductsRepository();
}