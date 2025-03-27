import { Product } from "../../models/Product/Product";
import { getAllProductsRepository } from "../../repositories/Product/getAllProductsRepository";

export async function getAllProductsService(user_id : number): Promise<Product[]> {
  return await getAllProductsRepository(user_id);
}