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
exports.authUserController = void 0;
const userAuth_1 = __importDefault(require("../../models/Auth/userAuth"));
const tokenGenerator_1 = __importDefault(require("../../helpers/User/tokenGenerator"));
const dotenv_1 = __importDefault(require("dotenv"));
const authUserService_1 = require("../../services/Auth/authUserService");
dotenv_1.default.config();
const authUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const login = yield (0, authUserService_1.authUserService)(new userAuth_1.default(email, password));
        if (login.logged) {
            if (!process.env.KEY_TOKEN) {
                throw new Error("Clave de token no definida en variables de entorno");
            }
            const token = (0, tokenGenerator_1.default)({ id_user: login.id, role: login.role }, process.env.KEY_TOKEN, 60);
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            });
            return res.status(200).json({
                status: login.status,
                token: token,
            });
        }
        return res.status(401).json({
            status: login.status
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.authUserController = authUserController;
