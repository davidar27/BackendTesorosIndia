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
exports.getCartRepository = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getCartRepository = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query('SELECT c.producto_id, c.cantidad, p.nombre, p.descripcion, p.precio ' +
        'FROM carrito c ' +
        'INNER JOIN producto p ON c.producto_id = p.producto_id ' +
        'WHERE c.cliente_id = ?', [userId]);
    return rows;
});
exports.getCartRepository = getCartRepository;
