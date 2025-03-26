import { Cart, CartItem } from '../dto/cartDto';
import { CartRepository } from '../repositories/cartRepository';

export class CartService {
    // Agregar un producto al carrito
    public async addProductCart(userId: number, productId: number, quantity: number): Promise<void> {
        await CartRepository.addProduct(userId, productId, quantity);
    }

    // Actualizar la cantidad de un producto en el carrito.
    public async updateQuantityCart(userId: number, productId: number, quantity: number): Promise<void> {
        await CartRepository.updateQuantity(userId, productId, quantity);
    }

    // Eliminar un producto del carrito.
    public async deleteProductCart(userId: number, productId: number): Promise<void> {
        await CartRepository.deleteProduct(userId, productId);
    }

    // Vaciar el carrito.
    public async emptyCart(userId: number): Promise<void> {
        await CartRepository.emptyCart(userId);
    }

    // Consultar el contenido del carrito.
    public async getCart(userId: number): Promise<Cart> {
        const cartItems = await CartRepository.getCart(userId);

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
    }
}