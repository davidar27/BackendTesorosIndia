import { updateQuantityCartRepostory } from "@/repositories/Cart/updateQuantityCartRepostory";

export const updateQuantityCartService = async (userId: number, productId: number, quantity: number): Promise<void> => {
    await updateQuantityCartRepostory(userId, productId, quantity);
};
