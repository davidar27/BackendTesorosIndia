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
exports.updateProductController = updateProductController;
const updateProductService_1 = require("../../services/Product/updateProductService");
function updateProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const productUpdates = req.body;
            yield (0, updateProductService_1.updateProductService)(Number(id), productUpdates);
            res.status(200).json({ message: "Producto actualizado" });
        }
        catch (error) {
            res.status(400).json({ error: error.message || "Error al actualizar el producto" });
        }
    });
}
