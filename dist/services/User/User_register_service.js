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
const userRepository_1 = __importDefault(require("../../repositories/User/userRepository"));
const hashGenerator_1 = __importDefault(require("../../helpers/User/hashGenerator"));
class UserRegisterService {
    static listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.default.findAll();
        });
    }
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield (0, hashGenerator_1.default)(user.password);
            return yield userRepository_1.default.create(user);
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.findByEmail(email);
                return user;
            }
            catch (error) {
                console.error('Error en UserRegisterService.findByEmail:', error);
                throw new Error('Error al buscar el usuario por correo electrónico');
            }
        });
    }
}
exports.default = UserRegisterService;
