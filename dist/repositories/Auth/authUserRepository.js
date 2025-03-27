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
exports.authUserRepository = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../config/db"));
const authUserRepository = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT usuario_id, contraseña, rol FROM usuario WHERE correo = ?`;
        const values = [user.email];
        const result = yield db_1.default.execute(sql, values);
        const userRecord = result[0][0];
        if (!userRecord) {
            return { logged: false, status: "Usuario o contraseña inválidos" };
        }
        const passwordValid = yield bcryptjs_1.default.compare(user.password, userRecord.contraseña);
        if (!passwordValid) {
            return { logged: false, status: "Usuario o contraseña inválidos" };
        }
        return {
            logged: true,
            status: "Autenticación exitosa",
            id: userRecord.usuario_id,
            role: userRecord.rol,
        };
    }
    catch (error) {
        throw new Error(`Error en el repositorio de autenticación: ${error.message}`);
    }
});
exports.authUserRepository = authUserRepository;
