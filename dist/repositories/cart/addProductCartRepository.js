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
exports.addProductCartRepository = void 0;
const db_1 = __importDefault(require("../../config/db"));
const addProductCartRepository = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query('SELECT * FROM carrito WHERE cliente_id = ? AND producto_id = ?', [userId, productId]);
    if (rows.length > 0) {
        yield db_1.default.query('UPDATE carrito SET cantidad = cantidad + ? WHERE cliente_id = ? AND producto_id = ?', [quantity, userId, productId]);
    }
    else {
        yield db_1.default.query('INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)', [userId, productId, quantity]);
    }
});
exports.addProductCartRepository = addProductCartRepository;
2;
