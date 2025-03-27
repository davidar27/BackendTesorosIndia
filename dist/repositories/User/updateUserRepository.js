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
exports.updateUserRepository = void 0;
const db_1 = __importDefault(require("../../config/db"));
const updateUserRepository = (user_id, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, phone_number } = newUser;
    const sql = 'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE usuario_id = ?';
    yield db_1.default.execute(sql, [first_name, last_name, email, phone_number, user_id]);
});
exports.updateUserRepository = updateUserRepository;
