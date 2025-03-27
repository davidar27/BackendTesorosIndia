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
exports.emptyCart = exports.deleteProduct = exports.updateQuantity = exports.getCart = exports.addProduct = void 0;
const cartService_1 = require("../services/cartService");
const cartService = new cartService_1.CartService();
// Agregar un producto al carrito.
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity } = req.body;
        yield cartService.addProductCart(userId, productId, quantity);
        res.status(200).send('Producto agregado al carrito!');
    }
    catch (error) {
        res.status(400).send(error || 'Error al agregar el producto al carrito.');
    }
});
exports.addProduct = addProduct;
// Consultar el contenido del carrito.
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const cart = yield cartService.getCart(Number(userId));
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(400).send(error || 'Error al consultar el carrito.');
    }
});
exports.getCart = getCart;
// Actualizar la cantidad de un producto en el carrito.
const updateQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity } = req.body;
        yield cartService.updateQuantityCart(userId, productId, quantity);
        res.status(200).send('Cantidad actualizada en el carrito!');
    }
    catch (error) {
        res.status(400).send(error || 'Error al actualizar la cantidad.');
    }
});
exports.updateQuantity = updateQuantity;
// Eliminar un producto del carrito.
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        yield cartService.deleteProductCart(userId, productId);
        res.status(200).send('Producto eliminado del carrito!');
    }
    catch (error) {
        res.status(400).send(error || 'Error al eliminar el producto.');
    }
});
exports.deleteProduct = deleteProduct;
// Vaciar el carrito.
const emptyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        yield cartService.emptyCart(userId);
        res.status(200).send('Carrito vacio!');
    }
    catch (error) {
        res.status(400).send(error || 'Error al vaciar el carrito.');
    }
});
exports.emptyCart = emptyCart;
