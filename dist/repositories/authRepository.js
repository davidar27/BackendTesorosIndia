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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
class authRepository {
    static login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT id, password from users WHERE email = ?`;
            const values = [user.email];
            const result = yield db_1.default.execute(sql, values);
            if (result[0].length > 0) {
                const passwordValid = yield bcryptjs_1.default.compare(user.password, result[0][0].password);
                if (passwordValid) {
                    return { logged: true, status: "Successful authentication", id: result[0][0].id, role: result[0][0].role };
                }
                return { logged: false, status: "Invalid username or password" };
            }
            return { logged: false, status: "Invalid username or password" };
        });
    }
}
exports.default = authRepository;
