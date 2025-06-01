import express from 'express';
import register_validador from '@/middleware/User/register_validador';
import { createUserController } from '@/controllers/User/createUserController';
import { getAllUserController } from '@/controllers/User/getAllUserController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';
import { updateUserController } from '@/controllers/User/updateUserController';
import { deleteUserController } from '@/controllers/User/deleteUserController';


const router = express.Router();

router.get('/get-paquetes', getAllUserController);

router.post('/create-paquete', authMiddlewareToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator, createUserController);

router.put('/update-paquete/:id', authMiddlewareToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator, updateUserController);

router.delete('/delete-paquete/:id', authMiddlewareToken, checkRole('administrador'), deleteUserController);

export default router;