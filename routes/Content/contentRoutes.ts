import express from "express";
import upload from "../../config/multerConfig";
import { createContentController } from "../../controllers/content/createContentController";
import { verifyToken } from "../../middleware/Auth/verifyToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { uploadToAzureController } from "../../controllers/content/uploadToAzureController";

const router = express.Router();

router.post("/upload", upload.single("file"), verifyToken, checkRole('emprendedor'), uploadToAzureController);
router.post("/create", upload.single("file"), verifyToken, checkRole('emprendedor'), createContentController);



export default router;
