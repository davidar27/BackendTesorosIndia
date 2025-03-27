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
exports.findByEmailRepositoriy = void 0;
const db_1 = __importDefault(require("../../config/db"));
const findByEmailRepositoriy = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM usuario WHERE correo = ?';
    const [rows] = yield db_1.default.execute(sql, [email]);
    if (rows.length === 0)
        return null;
    const user = rows[0];
    return user;
});
exports.findByEmailRepositoriy = findByEmailRepositoriy;
