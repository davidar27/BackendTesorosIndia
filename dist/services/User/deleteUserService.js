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
exports.deleteUserService = void 0;
const deleteUserRepositories_1 = __importDefault(require("../../repositories/User/deleteUserRepositories"));
const deleteUserService = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deleteUserRepositories_1.default)(user_id);
        return { message: 'Usuario eliminado correctamente' };
    }
    catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
});
exports.deleteUserService = deleteUserService;
