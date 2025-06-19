import { getCartRepository } from "@/repositories/Cart/getCartRepository";

export const getCartService = async (user_id: number): Promise<any> => {
    return await getCartRepository(user_id);
};
