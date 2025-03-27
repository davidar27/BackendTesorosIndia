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
exports.deleteUserController = void 0;
const deleteUserService_1 = require("../../services/User/deleteUserService");
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, deleteUserService_1.deleteUserService)(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        yield (0, deleteUserService_1.deleteUserService)(Number(id));
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al intentar borrar el usuario:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteUserController = deleteUserController;
