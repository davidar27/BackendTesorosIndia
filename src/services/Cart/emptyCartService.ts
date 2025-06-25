import { emptyCartRepository } from "@/repositories/Cart/emptyCartRepository";

export const emptyCartService = async (userId: number): Promise<any> => {
    return await emptyCartRepository(userId);
};
2