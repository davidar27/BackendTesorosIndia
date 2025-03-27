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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductRepository = updateProductRepository;
const db_1 = __importDefault(require("../../config/db"));
function updateProductRepository(producto_id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        const fields = [];
        const values = [];
        if (product.nombre !== undefined) {
            fields.push("nombre = ?");
            values.push(product.nombre);
        }
        if (product.descripcion !== undefined) {
            fields.push("descripcion = ?");
            values.push(product.descripcion);
        }
        if (product.precio !== undefined) {
            fields.push("precio = ?");
            values.push(product.precio);
        }
        if (product.stock !== undefined) {
            fields.push("stock = ?");
            values.push(product.stock);
        }
        if (product.categoria_id !== undefined) {
            fields.push("categoria_id = ?");
            values.push(product.categoria_id);
        }
        if (product.estado !== undefined) {
            fields.push("estado = ?");
            values.push(product.estado);
        }
        if (fields.length === 0) {
            throw new Error("No hay campos para actualizar");
        }
        const sql = `UPDATE producto SET ${fields.join(", ")} WHERE producto_id = ?`;
        values.push(producto_id);
        yield db_1.default.execute(sql, values);
    });
}
