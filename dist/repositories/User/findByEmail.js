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
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT correo FROM usuario WHERE correo = ?';
    const rows = yield (0, query_1.query)(sql, [email]);
    return rows[0] || null;
});
exports.default = findByEmail;
