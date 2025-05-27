import express from 'express';
import register_validador from '../../middleware/User/register_validador';
import { createUserController } from '../../controllers/User/createUserController';
import { getAllUserController } from '../../controllers/User/getAllUserController';
import { authMiddlewareToken } from '../../middleware/Auth/authMiddlewareToken';
import { checkRole } from '../../middleware/Auth/checkRole';
import { updateUserController } from '../../controllers/User/updateUserController';
import { deleteUserController } from '../../controllers/User/deleteUserController';
import { createEntrepreneurController } from '../../controllers/User/createEntrepreneurController';
const router = express.Router();

router.get('/emprendedores', authMiddlewareToken, checkRole('administrador'), getAllUserController);

router.post('/registro', register_validador.validatorParam, register_validador.validator, createUserController);

router.post('/registrar/emprendedor', authMiddlewareToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator, createEntrepreneurController);

router.put('/:id', authMiddlewareToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator, updateUserController);

router.delete('/:id', authMiddlewareToken, checkRole('administrador'), deleteUserController);

export default router;