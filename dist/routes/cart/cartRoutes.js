"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartMiddleware_1 = require("../../middleware/cart/cartMiddleware");
const addProductController_1 = require("../../controllers/Cart/addProductController");
const updateQuantityController_1 = require("../../controllers/Cart/updateQuantityController");
const deleteProductController_1 = require("../../controllers/Cart/deleteProductController");
const emptyCartController_1 = require("../../controllers/Cart/emptyCartController");
const getCartController_1 = require("../../controllers/Cart/getCartController");
const router = (0, express_1.Router)();
// Agregar producto al carrito 
router.post('/add', cartMiddleware_1.cartMiddleware, addProductController_1.addProductController);
// Actualizar cantidad de un producto 
router.put('/update', cartMiddleware_1.cartMiddleware, updateQuantityController_1.updateQuantityController);
// Eliminar un producto del carrito
router.delete('/remove', cartMiddleware_1.cartMiddleware, deleteProductController_1.deleteProductController);
// Vaciar el carrito del cliente
router.delete('/clear', emptyCartController_1.emptyCartController);
// Consultar el contenido del carrito
router.get('/get', getCartController_1.getCartController);
exports.default = router;
