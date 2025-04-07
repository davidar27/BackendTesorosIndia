import { Cart, CartItem } from "../../models/Cart/cart";
import { getCartRepository } from "../../repositories/cart/getCartRepository";

export const getCartService = async (userId: number): Promise<Cart> => {
    const cartItems = await getCartRepository(userId);

    const items: CartItem[] = cartItems.map(item => ({
        productId: item.producto_id,
        name: item.nombre,
        description: item.descripcion,
        price: item.precio,
        quantity: item.cantidad,
        total: item.precio * item.cantidad,
    }));

    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

    return { userId, items, totalAmount };
};
