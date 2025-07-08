import { deleteProductRepository } from "@/repositories/Product/deleteProductRepository";
import { getProductByIdService } from "./getProductByIdService";
import { deleteFromAzureService } from "../Azure/deleteFromAzureService";
import { Product } from "@/models/Product/Product";

export async function deleteProductService(entrepreneur_id: number, product_id: number): Promise<void> {
    const product = await getProductByIdService(product_id) as Product
    await deleteFromAzureService(product.image as string)
    await deleteProductRepository(entrepreneur_id, product_id);
}