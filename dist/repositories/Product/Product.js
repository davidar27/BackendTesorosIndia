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
exports.ProductRepository = void 0;
const db_1 = __importDefault(require("../../config/db"));
class ProductRepository {
    // Crear un producto
    static createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO producto (nombre, descripcion, precio, stock, categoria_id, emprendedor_id, estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                product.nombre,
                product.descripcion || null,
                product.precio || null,
                product.stock || null,
                product.categoria_id || null,
                product.emprendedor_id,
                product.estado || 'disponible'
            ];
            const [result] = yield db_1.default.execute(sql, values);
            return result.insertId;
        });
    }
    // Consultar un producto por ID
    static getProductById(producto_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM producto WHERE producto_id = ?`;
            const [rows] = yield db_1.default.execute(sql, [producto_id]);
            if (rows.length === 0)
                return null;
            return rows[0];
        });
    }
    // Consultar todos los productos
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM producto`;
            const [rows] = yield db_1.default.execute(sql);
            return rows;
        });
    }
    // Actualizar un producto
    static updateProduct(producto_id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            // Se arma la consulta de forma dinámica según los campos que se quieran actualizar
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
    // Eliminar un producto
    static deleteProduct(producto_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM producto WHERE producto_id = ?`;
            yield db_1.default.execute(sql, [producto_id]);
        });
    }
}
exports.ProductRepository = ProductRepository;
