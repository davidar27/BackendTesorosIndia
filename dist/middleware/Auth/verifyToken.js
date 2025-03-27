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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenKey = process.env.KEY_TOKEN;
    if (!tokenKey) {
        return res.status(500).json({ message: "Token key is not set in environment variables" });
    }
    const authorization = req.header('Authorization');
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization header is required and must start with 'Bearer '" });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "You have not sent a token" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, tokenKey);
        req.body.userId = decoded.data.userId;
        req.body.role = decoded.data.role;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Unauthorized", error: error.message });
    }
});
exports.verifyToken = verifyToken;
