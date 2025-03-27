"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const cartMiddleware_1 = require("../middleware/cart/cartMiddleware");
const router = (0, express_1.Router)();
// Agregar producto al carrito 
router.post('/add', cartMiddleware_1.cartMiddleware, cartController_1.addProduct);
// Actualizar cantidad de un producto 
router.put('/update', cartMiddleware_1.cartMiddleware, cartController_1.updateQuantity);
// Eliminar un producto del carrito
router.delete('/remove', cartMiddleware_1.cartMiddleware, cartController_1.deleteProduct);
// Vaciar el carrito del cliente
router.delete('/clear', cartController_1.emptyCart);
// Consultar el contenido del carrito
router.get('/get', cartController_1.getCart);
exports.default = router;
