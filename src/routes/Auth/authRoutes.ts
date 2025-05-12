import express from "express";
import authMiddleware from "../../middleware/Auth/authMiddleware";
import { authUserController } from "../../controllers/Auth/authUserController";
import { verifyEmailController } from '../../controllers/Auth/verifyEmailController';


 const router = express.Router();

router.post('/login', authMiddleware.validatorParams, authMiddleware.validator, authUserController);
router.post('/logout', authMiddleware.validatorParams, authMiddleware.validator, authUserController);
router.post('/recuperar-contraseña', authMiddleware.validatorParams, authMiddleware.validator, authUserController);
router.get('/verificar-correo', verifyEmailController);



export default router;