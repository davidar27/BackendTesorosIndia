import express from "express";
import upload from "../../config/multerConfig";
import { createContentController } from "../../controllers/Content/createContentController";
import { verifyToken } from "../../middleware/Auth/verifyToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { uploadToAzureController } from "../../controllers/Content/uploadToAzureController";
import { deleteContentController } from "../../controllers/Content/deleteContentController";
import { getContentByIdController } from "../../controllers/Content/getContentByIdController";
import { updateContentController } from "../../controllers/Content/updateContentController";

const router = express.Router();

router.post("/upload", upload.single("file"), verifyToken, checkRole('emprendedor'), uploadToAzureController);
router.post("/create", upload.single("file"), verifyToken, checkRole('emprendedor'), createContentController);
router.put("/id", upload.single("file"), verifyToken, checkRole('emprendedor'), updateContentController);
router.delete("/id", verifyToken, checkRole('emprendedor'), deleteContentController);
router.get("/finca", verifyToken, checkRole('emprendedor'), getContentByIdController);



export default router;
