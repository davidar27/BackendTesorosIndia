import express from "express";
import authMiddleware from "../../middleware/Auth/authMiddleware";
import { authUserController } from "../../controllers/Auth/authUserController";
import { verifyEmailController } from '../../controllers/Auth/verifyEmailController';
import { logoutController } from "../../controllers/Auth/logoutController";
import { verifyTokenController } from "../../controllers/Auth/verifyTokenController";


const router = express.Router();

router.post('/login', authMiddleware.validatorParams, authMiddleware.validator, authUserController);
router.post('/logout', logoutController);
router.post('/recuperar-contraseña', authMiddleware.validatorParams, authMiddleware.validator, authUserController);
router.get('/verificar-correo', verifyEmailController);
router.get('/verificar-token"', verifyTokenController);


export default router;