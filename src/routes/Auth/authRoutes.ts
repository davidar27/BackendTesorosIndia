import express from "express";
import authInputValidator from "../../middleware/Auth/authInputValidator";
import { authUserController } from "../../controllers/Auth/authUserController";
import { verifyEmailController } from '../../controllers/Auth/verifyEmailController';
import { logoutController } from "../../controllers/Auth/logoutController";
import { verifyTokenController } from "../../controllers/Auth/verifyTokenController";
// import  refreshToken  from "../../controllers/Auth/refreshToken";


const router = express.Router();

router.post('/login', authInputValidator.validatorParams, authInputValidator.validator, authUserController);
router.post('/logout', logoutController);
router.post('/recuperar-contraseña', authInputValidator.validatorParams, authInputValidator.validator, authUserController);
router.get('/verificar-correo', verifyEmailController);
router.get('/verificar-token', verifyTokenController);
// router.post('/refrescar-token', refreshToken);


    export default router;