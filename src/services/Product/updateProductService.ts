import { Product } from "@/models/Product/Product";
import { updateProductRepository } from "@/repositories/Product/updateProductRepository";
import { deleteFromAzureService } from "../Azure/deleteFromAzureService";
import { getProductByIdService } from "./getProductByIdService";

export async function updateProductService(product_id: number, product: Product): Promise<void> {
  if (product.image) {
    const productGetted = await getProductByIdService(product_id) as Product
    await deleteFromAzureService(productGetted.image as string)
  }
  await updateProductRepository(product_id, product);
}