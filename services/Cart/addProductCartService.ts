import { addProductCartRepository } from "../../repositories/cart/addProductCartRepository";

export const addProductCartService = async (userId: number, productId: number, quantity: number): Promise<void> => {
    await addProductCartRepository(userId, productId, quantity);
};
