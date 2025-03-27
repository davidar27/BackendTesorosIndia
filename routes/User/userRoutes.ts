import express from 'express';
import register_validador from '../../middleware/User/register_validador';
import { createUserController } from '../../controllers/User/createUserController';
import { getAllUserController } from '../../controllers/User/getAllUserController';
import { verifyToken } from '../../middleware/Auth/verifyToken';
import { checkRole } from '../../middleware/Auth/checkRole';
import { updateUserController } from '../../controllers/User/updateUserController';
import { deleteUserController } from '../../controllers/User/deleteUserController';
const router = express.Router();

router.get('/users', verifyToken, checkRole('administrador'), getAllUserController);

router.post('/register', register_validador.validatorParam, register_validador.validator, createUserController);

router.post('/register/emprendedor', verifyToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator, createUserController);

router.put('/:id', verifyToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator, updateUserController);

router.delete('/:id', verifyToken, checkRole('administrador'), deleteUserController);

export default router;