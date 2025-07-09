import { updateProductStatusRepository } from "@/repositories/Product/updateProductStatusRepository";
import { findByIdUserService } from "../User/findByIdUserService";

export async function updateProductStatusService( product_id: number): Promise<void> {
    await updateProductStatusRepository(product_id);
} 