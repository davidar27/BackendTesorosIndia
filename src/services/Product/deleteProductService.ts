import { deleteProductRepository } from "../../repositories/Product/deleteProductRepository";

export async function deleteProductService(emprendedor_id: number, producto_id: number): Promise<void> {
    await deleteProductRepository(emprendedor_id, producto_id);
}