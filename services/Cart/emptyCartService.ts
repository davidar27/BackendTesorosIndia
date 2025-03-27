import { emptyCartRepository } from "../../repositories/cart/emptyCartRepository";

export const emptyCartService = async (userId: number): Promise<void> => {
    await emptyCartRepository(userId);
};
2