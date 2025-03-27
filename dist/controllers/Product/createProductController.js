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
exports.createProductController = createProductController;
const createProductService_1 = require("../../services/Product/createProductService");
function createProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = Object.assign(Object.assign({}, req.body), { emprendedor_id: req.body.userId });
            const producto_id = yield (0, createProductService_1.createProductService)(product);
            res.status(201).json({ message: "Producto creado", producto_id });
        }
        catch (error) {
            res.status(400).json({ error: error.message || "Error al crear el producto" });
        }
    });
}
