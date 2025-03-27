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
exports.findAllUserRepositories = void 0;
const query_1 = require("../../helpers/db/query");
const findAllUserRepositories = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT usuario_id, nombre, apellido, correo, telefono, fecha_registro, estado FROM usuario';
    return yield (0, query_1.query)(sql);
});
exports.findAllUserRepositories = findAllUserRepositories;
