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
const deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteUser.delete(user_id);
        return { message: 'Usuario eliminado correctamente' };
    }
    catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
});
exports.default = deleteUser;
