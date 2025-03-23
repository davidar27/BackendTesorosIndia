"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../../controllers/User/authController"));
var authMiddleware_1 = __importDefault(require("../../middleware/User/authMiddleware"));
var router = express_1.default.Router();
router.post('/auth', authMiddleware_1.default.validatorParams, authMiddleware_1.default.validator, authController_1.default);
exports.default = router;
