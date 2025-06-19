import { emptyCartRepository } from "@/repositories/Cart/emptyCartRepository";

export const emptyCartService = async (user_id: number): Promise<any> => {
    return await emptyCartRepository(user_id);
};
2