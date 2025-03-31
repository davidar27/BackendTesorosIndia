import express from "express";
import upload from "../../config/multerConfig";
import { createContentController } from "../../controllers/content/createContentController";
import { verifyToken } from "../../middleware/Auth/verifyToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { uploadToAzureController } from "../../controllers/content/uploadToAzureController";
import { deleteContentController } from "../../controllers/content/deleteContentController";
import { getContentByIdController } from "../../controllers/content/getContentByIdController";
import { updateContentController } from "../../controllers/content/updateContentController";

const router = express.Router();

router.post("/upload", upload.single("file"), verifyToken, checkRole('emprendedor'), uploadToAzureController);
router.post("/create", upload.single("file"), verifyToken, checkRole('emprendedor'), createContentController);
router.put("/id", upload.single("file"), verifyToken, checkRole('emprendedor'), updateContentController);
router.delete("/id", verifyToken, checkRole('emprendedor'), deleteContentController);
router.get("/finca", verifyToken, checkRole('emprendedor'), getContentByIdController);



export default router;
