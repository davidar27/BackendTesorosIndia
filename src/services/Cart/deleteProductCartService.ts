import { deleteProductCartRepository } from "@/repositories/Cart/deleteProductCartRepository";

export const deleteProductCartService = async (userId: number, productId: number): Promise<any> => {
    await deleteProductCartRepository(userId, productId);
};
