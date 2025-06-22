import express from 'express';
import register_validador from '@/middleware/User/register_validador';
import { createUserController } from '@/controllers/User/createUserController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';
import { deleteUserController } from '@/controllers/User/deleteUserController';
import { uploadFiles } from '@/config/multerConfig';
import { updateClientController } from '@/controllers/User/updateClientController';
import { getEntrepreneurController } from '@/controllers/User/getEntrepreneurController';
import { getProfileController } from '@/controllers/User/getProfileController';

const router = express.Router();

router.get('/emprendedores', getEntrepreneurController);
router.get('/perfil/:id',getProfileController)


router.post('/registro', uploadFiles, register_validador.validatorParam, register_validador.validator, createUserController);
router.put('/actualizar', authMiddlewareToken, uploadFiles, updateClientController);
router.delete('/eliminar/:id', authMiddlewareToken, checkRole('administrador'), deleteUserController);


export default router;