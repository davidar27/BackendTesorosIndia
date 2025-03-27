"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
class CartService {
    // Agregar un producto al carrito
    addProductCart(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CartRepository.addProduct(userId, productId, quantity);
        });
    }
    // Actualizar la cantidad de un producto en el carrito.
    updateQuantityCart(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CartRepository.updateQuantity(userId, productId, quantity);
        });
    }
    // Eliminar un producto del carrito.
    deleteProductCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CartRepository.deleteProduct(userId, productId);
        });
    }
    // Vaciar el carrito.
    emptyCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CartRepository.emptyCart(userId);
        });
    }
    // Consultar el contenido del carrito.
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItems = yield CartRepository.getCart(userId);
            const items = cartItems.map(item => ({
                productId: item.producto_id,
                name: item.nombre,
                description: item.descripcion,
                price: item.precio,
                quantity: item.cantidad,
                total: item.precio * item.cantidad,
            }));
            const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
            return { userId, items, totalAmount };
        });
    }
}
exports.CartService = CartService;
