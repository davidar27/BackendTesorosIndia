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
exports.registerUserService = void 0;
const hashGenerator_1 = __importDefault(require("../../helpers/User/hashGenerator"));
const createUserRepository_1 = require("../../repositories/User/createUserRepository");
const registerUserService = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    newUser.password = yield (0, hashGenerator_1.default)(newUser.password);
    return yield (0, createUserRepository_1.createUserRepository)(newUser);
});
exports.registerUserService = registerUserService;
