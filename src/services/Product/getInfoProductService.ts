import { getInfoProductRepository } from "@/repositories/Product/getInfoProductRepository";
import { getReviewsByProduct } from "@/repositories/Review/getReviewsByProduct";

export async function getInfoProductService(product_id: number) {
    const info = await getInfoProductRepository(product_id);
    const reviews = await getReviewsByProduct(product_id)
    const infoProduct = {
        ...info,
        reviews: reviews
    }
    return infoProduct
}