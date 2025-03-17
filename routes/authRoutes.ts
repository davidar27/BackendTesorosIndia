import express  from "express";
import authController from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

router.post('/auth', authMiddleware.validatorParams, authMiddleware.validator, authController);

export default router;