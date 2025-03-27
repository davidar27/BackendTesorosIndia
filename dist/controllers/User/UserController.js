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
const User_1 = __importDefault(require("../../models/User/User"));
const User_register_service_1 = __importDefault(require("../../services/User/User_register_service"));
class createUserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password, phone_number, role } = req.body;
                const existingUser = yield User_register_service_1.default.findByEmail(email);
                if (existingUser) {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
                }
                const userRegister = yield User_register_service_1.default.register(new User_1.default(first_name, last_name, email, phone_number, password, role));
                return res.status(201).json({ message: 'Tu registro ha sido exitoso' });
            }
            catch (error) {
                console.error('Error al crear el usuario:', error);
                res.status(500).json({ error: 'Error al crear el usuario' });
            }
        });
    }
}
exports.default = new UserController();
