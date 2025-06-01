import express from "express";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import { uploadFiles } from "@/config/multerConfig";
import { createFarmController } from "@/controllers/Farm/createFarmController";
import { updateFarmController } from "@/controllers/Farm/updateFarmController";
import { deleteFarmController } from "@/controllers/Farm/deleteFarmController";
import { getFarmByIdController } from "@/controllers/Farm/getFarmByIdController";
import { getAllFarmController } from "@/controllers/Farm/getAllFarmController";
import { getFarmsByCategoryController } from "@/controllers/Farm/getFarmsByCategoryController";
import { getMyFarmController } from "@/controllers/Farm/getMyFarmController";

const router = express.Router();

// Rutas públicas de fincas
router.get('/', getAllFarmController);
router.get('/:id', getFarmByIdController);
router.get('/categorias/:categoryId', getFarmsByCategoryController);

// Rutas privadas de fincas
router.get('/mi-finca', authMiddlewareToken, checkRole('emprendedor'), getMyFarmController);

router.post("/crear", uploadFiles, authMiddlewareToken, checkRole('emprendedor'), createFarmController);
router.put("/actualizar/:id", uploadFiles, authMiddlewareToken, checkRole('emprendedor'), updateFarmController);
router.delete("/eliminar/:id", authMiddlewareToken, checkRole('emprendedor'), deleteFarmController);

// router.get("/fincas/emprendedor", authMiddlewareToken, checkRole('emprendedor'), getAllFarmByEmprendedorController);

export default router;
