import { getInfoProductRepository } from "@/repositories/Product/getInfoProductRepository";
import { getStatsReviewsProductRepository } from "@/repositories/Product/getStatsReviewsProductRepository";
import { getReviewsByProduct } from "@/repositories/Review/getReviewsByProduct";

export async function getInfoProductService(product_id: number) {
    const info = await getInfoProductRepository(product_id);
    const reviews = await getReviewsByProduct(product_id)
    const [stats] = await getStatsReviewsProductRepository(product_id)
    const infoProduct = {
        ...info,
        reviews: reviews,
        stats: stats
    }
    return infoProduct
}