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
const LoginUser_1 = require("../../models/User/LoginUser");
const authService_1 = __importDefault(require("../../services/authService"));
const tokenGenerator_1 = __importDefault(require("../../helpers/tokenGenerator"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let authController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const login = yield authService_1.default.login(new LoginUser_1.loginUser(email, password));
        if (login.logged) {
            return res.status(200).json({
                status: login.status,
                token: (0, tokenGenerator_1.default)({ id_user: login.id, role: login.role }, process.env.KEY_TOKEN, 60)
            });
        }
        return res.status(401).json({
            status: login.status
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = authController;
