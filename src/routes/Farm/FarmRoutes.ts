import express from "express";
import { authMiddlewareToken } from "../../middleware/Auth/authMiddlewareToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { uploadFiles } from "../../config/multerConfig";
import { createFarmController } from "../../controllers/Farm/createFarmController";
import { updateFarmController } from "../../controllers/Farm/updateFarmController";
import { deleteFarmController } from "../../controllers/Farm/deleteFarmController";
import { getFarmByIdController } from "../../controllers/Farm/getFarmByIdController";
import { getAllFarmController } from "../../controllers/Farm/getAllFarmController";

const router = express.Router();

router.post("/create", uploadFiles, authMiddlewareToken, checkRole('emprendedor'), createFarmController);
router.put("/update/:id", uploadFiles, authMiddlewareToken, checkRole('emprendedor'), updateFarmController);
router.delete("/delete/:id", authMiddlewareToken, checkRole('emprendedor'), deleteFarmController);
router.get("/get:id", authMiddlewareToken, checkRole('emprendedor'), getFarmByIdController);
router.get("/", authMiddlewareToken, checkRole('emprendedor'), getAllFarmController);


export default router;
