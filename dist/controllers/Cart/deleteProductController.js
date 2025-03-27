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
exports.deleteProductController = void 0;
const deleteProductCartService_1 = require("../../services/Cart/deleteProductCartService");
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        yield (0, deleteProductCartService_1.deleteProductCartService)(userId, productId);
        res.status(200).send("Producto eliminado del carrito!");
    }
    catch (error) {
        res.status(400).send(error || "Error al eliminar el producto.");
    }
});
exports.deleteProductController = deleteProductController;
