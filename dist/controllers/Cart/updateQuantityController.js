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
exports.updateQuantityController = void 0;
const updateQuantityCartService_1 = require("../../services/Cart/updateQuantityCartService");
const updateQuantityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity } = req.body;
        yield (0, updateQuantityCartService_1.updateQuantityCartService)(userId, productId, quantity);
        res.status(200).send("Cantidad actualizada en el carrito!");
    }
    catch (error) {
        res.status(400).send(error || "Error al actualizar la cantidad.");
    }
});
exports.updateQuantityController = updateQuantityController;
