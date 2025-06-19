import { deleteProductCartRepository } from "@/repositories/Cart/deleteProductCartRepository";

export const deleteProductCartService = async (user_id: number, product_id: number): Promise<any> => {
    await deleteProductCartRepository(user_id, product_id);
};
