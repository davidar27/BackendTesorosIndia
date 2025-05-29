import express from "express";
import authInputValidator from "../../middleware/Auth/authInputValidator";
import { authUserController } from "../../controllers/Auth/authUserController";
import { verifyEmailController } from '../../controllers/Auth/verifyEmailController';
import { logoutController } from "../../controllers/Auth/logoutController";
import { verifyTokenController } from "../../controllers/Auth/verifyTokenController";
import { refreshToken } from "../../controllers/Auth/refreshToken";
import { resendVerificationEmail } from "../../controllers/Auth/resendEmailVerification";
import { recoverPasswordController } from "../../controllers/Auth/recoverPasswordController";
import { resetPasswordController } from "../../controllers/Auth/resetPasswordController";
import resetPasswordValidation from "../../middleware/Auth/resetPasswordValidation";
import { checkVerification } from "../../controllers/Auth/checkVerificationController";

const router = express.Router();

router.post('/login', authInputValidator.validatorParams, authInputValidator.validator, authUserController);
router.post('/logout', logoutController);
router.post('/recuperar-password',  recoverPasswordController);
router.put('/restablecer-password', resetPasswordValidation.validatorParam, resetPasswordValidation.validator, resetPasswordController);
router.get('/verificar-correo', verifyEmailController);
router.get('/verificar-token', verifyTokenController);
router.post('/refrescar-token', refreshToken);
router.post('/reenviar-correo-verificacion', resendVerificationEmail);
router.get('/revisar-verificacion', checkVerification);

export default router;