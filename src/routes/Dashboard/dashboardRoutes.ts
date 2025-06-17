import express from "express";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import { getDashboardStatsController } from "@/controllers/Dashboard/getDashboardStatsController";
import { getDashboardCategoriesController } from "@/controllers/Dashboard/category/getDashboardCategoriesController";
import { createEntrepreneursController } from "@/controllers/Dashboard/entreprenaur/createEntrepreneursController";
import { uploadSingleFile } from "@/config/multerConfig";
import { deleteEntrepreneurController } from "@/controllers/Dashboard/entreprenaur/deleteEntrepreneurController";
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


router.post('/emprendedores/crear', authMiddlewareToken, checkRole('administrador'), createEntrepreneursController);
router.delete('/emprendedores/eliminar/:userId', authMiddlewareToken, checkRole('administrador'), deleteEntrepreneurController);


router.get('/categorias', authMiddlewareToken, checkRole('administrador'), getDashboardCategoriesController);

export default router; 