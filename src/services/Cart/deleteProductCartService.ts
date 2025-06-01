import { deleteProductCartRepository } from "@/repositories/Cart/deleteProductCartRepository";

export const deleteProductCartService = async (userId: number, productId: number): Promise<void> => {
    await deleteProductCartRepository(userId, productId);
};
