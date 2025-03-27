"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middleware/Auth/authMiddleware"));
const authUserController_1 = require("../../controllers/Auth/authUserController");
const router = express_1.default.Router();
router.post('/login', authMiddleware_1.default.validatorParams, authMiddleware_1.default.validator, authUserController_1.authUserController);
router.post('/logout', authMiddleware_1.default.validatorParams, authMiddleware_1.default.validator, authUserController_1.authUserController);
exports.default = router;
