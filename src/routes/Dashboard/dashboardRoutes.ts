import express from "express";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import { getDashboardStatsController } from "@/controllers/Dashboard/getDashboardStatsController";
import { getDashboardExperiencesController } from "@/controllers/Dashboard/experience/getDashboardExperiencesController";
import { getEntrepreneursController } from "@/controllers/Dashboard/entreprenaur/getEntrepreneursController";
import { getDashboardPackagesController } from "@/controllers/Dashboard/packages/getDashboardPackagesController";
import { getDashboardCategoriesController } from "@/controllers/Dashboard/category/getDashboardCategoriesController";
import { createEntrepreneursController } from "@/controllers/Dashboard/entreprenaur/createEntrepreneursController";
import { updateEntrepreneursController } from "@/controllers/Dashboard/entreprenaur/updateEntrepreneursController";
import { uploadSingleFile } from "@/config/multerConfig";
import { deleteEntrepreneurController } from "@/controllers/Dashboard/entreprenaur/deleteEntrepreneurController";
import { changeStatusController } from "@/repositories/Dashboard/changeStatusController";
import { getEntitiesController } from "@/controllers/Dashboard/getEntitiesController";

const router = express.Router();

// Rutas del dashboard (solo para administradores)
router.get('/estadisticas', authMiddlewareToken, checkRole('administrador'), getDashboardStatsController);


router.get('/experiencias', authMiddlewareToken, checkRole('administrador'), getDashboardExperiencesController);

router.patch('/estado/:id', authMiddlewareToken, checkRole('administrador'), changeStatusController);
router.get('/:entityType', authMiddlewareToken, checkRole('administrador'), getEntitiesController);



router.get('/emprendedores', authMiddlewareToken, checkRole('administrador'), getEntrepreneursController);
router.post('/emprendedores/crear', authMiddlewareToken, checkRole('administrador'), createEntrepreneursController);
router.put('/emprendedores/actualizar/:userId', authMiddlewareToken, checkRole('administrador'), uploadSingleFile, updateEntrepreneursController);
router.delete('/emprendedores/eliminar/:userId', authMiddlewareToken, checkRole('administrador'), deleteEntrepreneurController);


router.get('/paquetes', authMiddlewareToken, checkRole('administrador'), getDashboardPackagesController);
router.get('/categorias', authMiddlewareToken, checkRole('administrador'), getDashboardCategoriesController);

export default router; 