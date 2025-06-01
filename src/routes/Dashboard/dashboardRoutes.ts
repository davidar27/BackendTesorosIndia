import express from "express";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import { getDashboardStatsController } from "@/controllers/Dashboard/getDashboardStatsController";
import { getDashboardFarmsController } from "@/controllers/Dashboard/getDashboardFarmsController";
import { getDashboardEntrepreneursController } from "@/controllers/Dashboard/getDashboardEntrepreneursController";
import { getDashboardPackagesController } from "@/controllers/Dashboard/getDashboardPackagesController";
import { getDashboardCategoriesController } from "@/controllers/Dashboard/getDashboardCategoriesController";

const router = express.Router();

// Rutas del dashboard (solo para administradores)
router.get('/estadisticas', authMiddlewareToken, checkRole('administrador'), getDashboardStatsController);
router.get('/fincas', authMiddlewareToken, checkRole('administrador'), getDashboardFarmsController);
router.get('/emprendedores', authMiddlewareToken, checkRole('administrador'), getDashboardEntrepreneursController);
router.get('/paquetes', authMiddlewareToken, checkRole('administrador'), getDashboardPackagesController);
router.get('/categorias', authMiddlewareToken, checkRole('administrador'), getDashboardCategoriesController);

export default router; 