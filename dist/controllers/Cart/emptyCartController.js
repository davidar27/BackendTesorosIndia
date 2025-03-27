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
exports.emptyCartController = void 0;
const emptyCartService_1 = require("../../services/Cart/emptyCartService");
const emptyCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        yield (0, emptyCartService_1.emptyCartService)(userId);
        res.status(200).send("Carrito vacío!");
    }
    catch (error) {
        res.status(400).send(error || "Error al vaciar el carrito.");
    }
});
exports.emptyCartController = emptyCartController;
