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
exports.createProductRepository = createProductRepository;
const db_1 = __importDefault(require("../../config/db"));
function createProductRepository(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkSql = `SELECT producto_id FROM producto WHERE nombre = ? AND emprendedor_id = ?`;
        const checkValues = [product.nombre, product.emprendedor_id];
        const [existing] = yield db_1.default.execute(checkSql, checkValues);
        console.log(existing);
        if (existing.length > 0) {
            throw new Error("Este producto ya ha sido registrado por el emprendedor.");
        }
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
