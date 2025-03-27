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
exports.deleteProductController = deleteProductController;
const deleteProductService_1 = require("../../services/Product/deleteProductService");
function deleteProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const emprendedor_id = req.body.userId;
            yield (0, deleteProductService_1.deleteProductService)(Number(id), emprendedor_id);
            res.status(200).json({ message: "Producto eliminado correctamente" });
        }
        catch (error) {
            if (error.message === "El producto no existe o no pertenece al emprendedor.") {
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(400).json({ error: "Error al eliminar el producto" });
        }
    });
}
