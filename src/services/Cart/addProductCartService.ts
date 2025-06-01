import { addProductCartRepository } from "@/repositories/Cart/addProductCartRepository";

export const addProductCartService = async (userId: number, productId: number, quantity: number): Promise<void> => {
    await addProductCartRepository(userId, productId, quantity);
};
