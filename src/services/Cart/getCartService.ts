import { getCartRepository } from "@/repositories/Cart/getCartRepository";

export const getCartService = async (userId: number): Promise<any> => {
    return await getCartRepository(userId);
};
