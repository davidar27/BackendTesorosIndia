import { updateQuantityCartRepostory } from "../../repositories/cart/updateQuantityCartRepostory";

export const updateQuantityCartService = async (userId: number, productId: number, quantity: number): Promise<void> => {
    await updateQuantityCartRepostory(userId, productId, quantity);
};
