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
exports.ProductController = void 0;
const createProductService_1 = require("../../services/Product/createProductService");
const getAllProductsService_1 = require("../../services/Product/getAllProductsService");
const getProductByIdService_1 = require("../../services/Product/getProductByIdService");
const updateProductService_1 = require("../../services/Product/updateProductService");
const deleteProductService_1 = require("../../services/Product/deleteProductService");
class ProductController {
    // Crear producto
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const producto_id = yield (0, createProductService_1.createProductService)(product);
                res.status(201).json({ message: "Producto creado", producto_id });
            }
            catch (error) {
                res.status(400).json({ error: error.message || "Error al crear el producto" });
            }
        });
    }
    // Consultar producto por ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const producto_id = Number(req.params.id);
                const product = yield (0, getProductByIdService_1.getProductByIdService)(producto_id);
                if (!product) {
                    res.status(404).json({ message: "Producto no encontrado" });
                    return;
                }
                res.status(200).json(product);
            }
            catch (error) {
                res.status(400).json({ error: error.message || "Error al obtener el producto" });
            }
        });
    }
    // Consultar todos los productos
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield (0, getAllProductsService_1.getAllProductsService)();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(400).json({ error: error.message || "Error al obtener los productos" });
            }
        });
    }
    // Actualizar producto
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const producto_id = Number(req.params.id);
                const productUpdates = req.body;
                yield (0, updateProductService_1.updateProductService)(producto_id, productUpdates);
                res.status(200).json({ message: "Producto actualizado" });
            }
            catch (error) {
                res.status(400).json({ error: error.message || "Error al actualizar el producto" });
            }
        });
    }
    // Eliminar producto
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body;
                const producto_id = Number(req.params.id);
                yield (0, deleteProductService_1.deleteProductService)(user_id, producto_id);
                res.status(200).json({ message: "Producto eliminado" });
            }
            catch (error) {
                res.status(400).json({ error: error.message || "Error al eliminar el producto" });
            }
        });
    }
}
exports.ProductController = ProductController;
