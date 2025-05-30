import express from "express";
import { authMiddlewareToken } from "../../middleware/Auth/authMiddlewareToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { uploadFiles } from "../../config/multerConfig";
import { createFarmController } from "../../controllers/Farm/createFarmController";
import { updateFarmController } from "../../controllers/Farm/updateFarmController";
import { deleteFarmController } from "../../controllers/Farm/deleteFarmController";
import { getFarmByIdController } from "../../controllers/Farm/getFarmByIdController";
import { getAllFarmController } from "../../controllers/Farm/getAllFarmController";
import { getAllNamesFarmController } from "../../controllers/Farm/getAllNamesFarmController";

const router = express.Router();

router.post("/crear", uploadFiles, authMiddlewareToken, checkRole('emprendedor'), createFarmController);
router.put("/actualizar/:id", uploadFiles, authMiddlewareToken, checkRole('emprendedor'), updateFarmController);
router.delete("/eliminar/:id", authMiddlewareToken, checkRole('emprendedor'), deleteFarmController);
router.get("/obtener:id", authMiddlewareToken, checkRole('emprendedor'), getFarmByIdController);
router.get("/", authMiddlewareToken, getAllFarmController);
router.get("/nombres", getAllNamesFarmController);

// router.get("/fincas/emprendedor", authMiddlewareToken, checkRole('emprendedor'), getAllFarmByEmprendedorController);

export default router;
