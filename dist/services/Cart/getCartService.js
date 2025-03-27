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
exports.getCartService = void 0;
const getCartRepository_1 = require("../../repositories/cart/getCartRepository");
const getCartService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItems = yield (0, getCartRepository_1.getCartRepository)(userId);
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
exports.getCartService = getCartService;
