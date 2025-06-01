import express from "express";
import authInputValidator from '@/middleware/Auth/authInputValidator';
import { authUserController } from '@/controllers/Auth/authUserController';
import { verifyEmailController } from '@/controllers/Auth/verifyEmailController';
import { logoutController } from '@/controllers/Auth/logoutController';
import { verifyTokenController } from '@/controllers/Auth/verifyTokenController';
import { refreshToken } from '@/controllers/Auth/refreshToken';
import { resendVerificationEmail } from '@/controllers/Auth/resendEmailVerification';
import { recoverPasswordController } from '@/controllers/Auth/recoverPasswordController';
import { resetPasswordController } from '@/controllers/Auth/resetPasswordController';
import resetPasswordValidation from '@/middleware/Auth/resetPasswordValidation';
import { checkVerification } from '@/controllers/Auth/checkVerificationController';

const router = express.Router();

// Rutas de autenticación
router.post('/iniciar-sesion', authInputValidator.validatorParams, authInputValidator.validator, authUserController);
router.post('/registro', authInputValidator.validatorParams, authInputValidator.validator, authUserController);
router.post('/verificacion/correo', verifyEmailController);
router.get('/verificacion', checkVerification);
router.post('/password/recuperar', recoverPasswordController);
router.put('/password/restablecer', resetPasswordValidation.validatorParam, resetPasswordValidation.validator, resetPasswordController);

// Rutas auxiliares de autenticación
router.post('/logout', logoutController);
router.get('/verificar-token', verifyTokenController);
router.post('/refrescar-token', refreshToken);
router.post('/reenviar-correo-verificacion', resendVerificationEmail);

export default router;