"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/Auth/authRoutes"));
const User_1 = __importDefault(require("./routes/User/User"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const app = (0, express_1.default)().use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/user', User_1.default);
app.use('/admin', User_1.default);
app.use('/user', authRoutes_1.default);
app.use('/cart', cartRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
