import { emptyCartRepository } from "@/repositories/Cart/emptyCartRepository";

export const emptyCartService = async (userId: number): Promise<void> => {
    await emptyCartRepository(userId);
};
2