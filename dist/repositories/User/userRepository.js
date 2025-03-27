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
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../helpers/db/query");
class UserRepository {
    // Obtener todos los usuarios
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT usuario_id, nombre, apellido, correo, telefono, fecha_registro, estado FROM usuario';
            return yield (0, query_1.query)(sql);
        });
    }
    // Obtener un usuario por ID
    findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT usuario_id, nombre, apellido, correo, telefono, fecha_registro, estado FROM usuario WHERE usuario_id = ?';
            const rows = yield (0, query_1.query)(sql, [user_id]);
            return rows[0] || null;
        });
    }
    // Crear un nuevo usuario
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, email, password, phone_number } = user;
            const sql = 'INSERT INTO usuario (nombre, apellido, correo, contraseña, telefono) VALUES (?, ?, ?, ?, ?)';
            const result = yield (0, query_1.query)(sql, [first_name, last_name, email, password, phone_number]);
            return result;
        });
    }
    // Actualizar un usuario existente
    update(user_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, email, phone_number } = user;
            const sql = 'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE usuario_id = ?';
            yield (0, query_1.query)(sql, [first_name, last_name, email, phone_number, user_id]);
        });
    }
    // Eliminar un usuario
    delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM usuario WHERE usuario_id = ?';
            yield (0, query_1.query)(sql, [user_id]);
        });
    }
    // Buscar un usuario por correo electrónico
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT correo FROM usuario WHERE correo = ?';
            const rows = yield (0, query_1.query)(sql, [email]);
            return rows[0] || null;
        });
    }
}
exports.default = new UserRepository();
