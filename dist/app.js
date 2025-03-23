"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var User_register_1 = __importDefault(require("./routes/User/User_register"));
dotenv_1.default.config();
var app = (0, express_1.default)().use(body_parser_1.default.json());
app.use('/user', User_register_1.default);
app.use('/auth', userAuth);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("API listening at http://localhost:".concat(PORT));
});
