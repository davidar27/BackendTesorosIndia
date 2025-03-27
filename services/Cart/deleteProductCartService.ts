import { deleteProductCartRepository } from "../../repositories/cart/deleteProductCartRepository";

export const deleteProductCartService = async (userId: number, productId: number): Promise<void> => {
    await deleteProductCartRepository(userId, productId);
};
