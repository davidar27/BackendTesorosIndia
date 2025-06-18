import express from "express";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import { getDashboardStatsController } from "@/controllers/Dashboard/getDashboardStatsController";
import { uploadSingleFile } from "@/config/multerConfig";
import { changeStatusController } from "@/controllers/Dashboard/generic/changeStatusController";
import { getEntitiesController } from "@/controllers/Dashboard/generic/getEntitiesController";
import { updateGenericController } from "@/controllers/Dashboard/generic/updateGenericController";
import { createGenericController } from "@/controllers/Dashboard/generic/createGenericController";

const router = express.Router();

// Rutas del dashboard (solo para administradores)
router.get('/estadisticas', authMiddlewareToken, checkRole('administrador'), getDashboardStatsController);


router.patch('/estado/:entityType/:id', authMiddlewareToken, checkRole('administrador'), changeStatusController);
router.get('/:entityType', authMiddlewareToken, checkRole('administrador'), getEntitiesController);
router.put('/actualizar/:entityType/:userId', authMiddlewareToken, checkRole('administrador'), uploadSingleFile, updateGenericController);
router.post('/:entityType', authMiddlewareToken, checkRole('administrador'), uploadSingleFile, createGenericController);





export default router; 