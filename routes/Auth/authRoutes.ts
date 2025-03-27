import express from "express";
import authMiddleware from "../../middleware/Auth/authMiddleware";
import { authUserController } from "../../controllers/Auth/authUserController";

const router = express.Router();

router.post('/login', authMiddleware.validatorParams, authMiddleware.validator, authUserController);
router.post('/logout', authMiddleware.validatorParams, authMiddleware.validator, authUserController);

export default router;