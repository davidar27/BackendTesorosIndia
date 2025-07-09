import express from "express";
import { getModerationStatusController, testModerationController } from '@/controllers/ContentModeration/moderationStatusController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';

const router = express.Router();

// Ruta para verificar el estado del servicio de moderación (solo administradores)
router.get("/status", authMiddlewareToken, checkRole(['administrador']), getModerationStatusController);

// Ruta para probar la moderación (solo administradores)
router.post("/test", authMiddlewareToken, checkRole(['administrador']), testModerationController);

export default router; 