import { updateQuantityCartRepostory } from "@/repositories/Cart/updateQuantityCartRepostory";

export const updateQuantityCartService = async (userId: number, productId: number, quantity: number): Promise<any> => {
    return await updateQuantityCartRepostory(userId, productId, quantity);
};
