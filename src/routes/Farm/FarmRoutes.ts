import express from "express";
import { verifyToken } from "../../middleware/Auth/verifyToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { uploadFiles } from "../../config/multerConfig";
import { createFarmController } from "../../controllers/Farm/createFarmController";
import { updateFarmController } from "../../controllers/Farm/updateFarmController";
import { deleteFarmController } from "../../controllers/Farm/deleteFarmController";
import { getFarmByIdController } from "../../controllers/Farm/getFarmByIdController";
import { getAllFarmController } from "../../controllers/Farm/getAllFarmController";

const router = express.Router();

router.post("/create", uploadFiles, verifyToken, checkRole('emprendedor'), createFarmController);
router.put("/update/:id", uploadFiles, verifyToken, checkRole('emprendedor'), updateFarmController);
router.delete("/delete/:id", verifyToken, checkRole('emprendedor'), deleteFarmController);
router.get("/get:id", verifyToken, checkRole('emprendedor'), getFarmByIdController);
router.get("/", verifyToken, checkRole('emprendedor'), getAllFarmController);


export default router;
