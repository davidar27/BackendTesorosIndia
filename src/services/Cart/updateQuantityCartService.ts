import { updateQuantityCartRepostory } from "@/repositories/Cart/updateQuantityCartRepostory";

export const updateQuantityCartService = async (user_id: number, product_id: number, quantity: number): Promise<any> => {
    return await updateQuantityCartRepostory(user_id, product_id, quantity);
};
