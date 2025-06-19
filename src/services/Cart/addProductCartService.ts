import { addProductCartRepository } from "@/repositories/Cart/addProductCartRepository";

export const addProductCartService = async (user_id: number, product_id: number): Promise<any> => {
    return await addProductCartRepository(user_id, product_id);
};
