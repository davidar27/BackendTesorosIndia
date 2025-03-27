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
class UserController {
    // Obtener todos los usuarios
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository_1.default.findAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
        });
    }
    // Obtener un usuario por ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userRepository_1.default.findById(Number(id));
                if (!user) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener el usuario' });
            }
        });
    }
    // Crear un nuevo usuario
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password, phone_number } = req.body;
                const existingUser = yield userRepository_1.default.findByEmail(email);
                if (existingUser) {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
                }
                const newUser = { first_name, last_name, email, password, phone_number };
                const userId = yield userRepository_1.default.create(newUser);
                res.status(201).json(Object.assign({ usuario_id: userId }, newUser));
            }
            catch (error) {
                res.status(500).json({ error: 'Error al crear el usuario' });
            }
        });
    }
    // Actualizar un usuario existente
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { first_name, last_name, email, phone_number } = req.body;
                const existingUser = yield userRepository_1.default.findById(Number(id));
                if (!existingUser) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                yield userRepository_1.default.update(Number(id), { first_name, last_name, email, phone_number });
                res.json({ user_id: id, first_name, last_name, email, phone_number });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al actualizar el usuario' });
            }
        });
    }
    // Eliminar un usuario
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const existingUser = yield userRepository_1.default.findById(Number(id));
                if (!existingUser) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                yield userRepository_1.default.delete(Number(id));
                res.json({ message: 'Usuario eliminado correctamente' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el usuario' });
            }
        });
    }
}
exports.default = new UserController();
