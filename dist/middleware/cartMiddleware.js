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
exports.cartMiddleware = void 0;
const getProductRepositorie_1 = require("../repositories/cart/getProductRepositorie");
const cartMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.body.productId || req.params.productId;
    const quantity = req.body.quantity;
    try {
        const product = yield (0, getProductRepositorie_1.getProductRepositorie)(productId);
        if (product.length === 0) {
            return res.status(404).json({ error: 'El producto no existe.' });
        }
        const productData = product[0];
        if (quantity && quantity > productData.stock) {
            return res.status(400).json({ error: 'La cantidad solicitada excede el stock disponible.' });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.cartMiddleware = cartMiddleware;
