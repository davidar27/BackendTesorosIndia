"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cartRoutes_1 = __importDefault(require("./routes/cart/cartRoutes"));
const userRoutes_1 = __importDefault(require("./routes/User/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/Auth/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/Product/productRoutes"));
const checkRole_1 = require("./middleware/Auth/checkRole");
dotenv_1.default.config();
const app = (0, express_1.default)().use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/user', userRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/cart', cartRoutes_1.default, (0, checkRole_1.checkRole)('cliente'));
app.use('/product', productRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
