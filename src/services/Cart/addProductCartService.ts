import { addProductCartRepository } from "@/repositories/Cart/addProductCartRepository";

export const addProductCartService = async (userId: number, productId: number): Promise<any> => {
    return await addProductCartRepository(userId, productId);
};
