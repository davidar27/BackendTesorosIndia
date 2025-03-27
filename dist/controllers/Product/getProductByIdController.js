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
exports.getProductByIdController = getProductByIdController;
const getProductByIdService_1 = require("../../services/Product/getProductByIdService");
function getProductByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = Number(req.params.id);
            const product = yield (0, getProductByIdService_1.getProductByIdService)(productId);
            if (!product) {
                res.status(404).json({ message: "Producto no encontrado" });
                return;
            }
            res.status(200).json(product);
        }
        catch (error) {
            const statusCode = error instanceof Error ? 500 : 400;
            const message = error instanceof Error ? error.message : "Error al obtener el producto";
            res.status(statusCode).json({ error: message });
        }
    });
}
