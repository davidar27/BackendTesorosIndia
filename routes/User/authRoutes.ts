import express  from "express";
import authController from "../../controllers/User/authController";
import authMiddleware from "../../middleware/User/authMiddleware";
const router = express.Router();

router.post('/auth', authMiddleware.validatorParams, authMiddleware.validator, authController);

export default router;