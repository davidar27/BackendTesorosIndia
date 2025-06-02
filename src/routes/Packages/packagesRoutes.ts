import express from 'express';
import register_validador from '@/middleware/User/register_validador';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';
import { deleteUserController } from '@/controllers/User/deleteUserController';


const router = express.Router();

router.get('/get-paquetes', );

router.post('/create-paquete', authMiddlewareToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator);

router.put('/update-paquete/:id', authMiddlewareToken, checkRole('administrador'), register_validador.validatorParam, register_validador.validator);

router.delete('/delete-paquete/:id', authMiddlewareToken, checkRole('administrador'), deleteUserController);

export default router;