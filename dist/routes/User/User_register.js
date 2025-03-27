"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_validador_1 = __importDefault(require("../../middleware/User/register_validador"));
const registerController_1 = __importDefault(require("../../controllers/User/registerController"));
const router = express_1.default.Router();
router.post('/user_register', register_validador_1.default.validatorParam, register_validador_1.default.validator, registerController_1.default);
router.post('/delete_register', register_validador_1.default.validatorParam, register_validador_1.default.validator, registerController_1.default);
exports.default = router;
