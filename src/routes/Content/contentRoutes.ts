import express from "express";
import { verifyToken } from "../../middleware/Auth/verifyToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { createContentController } from "../../controllers/content/createContentController";
import { uploadFiles } from "../../config/multerConfig";
import { deleteContentController } from "../../controllers/content/deleteContentController";
import { updateContentController } from "../../controllers/content/updateContentController";
import { getContentByIdController } from "../../controllers/content/getContentByIdController";

const router = express.Router();

router.post("/create", uploadFiles, verifyToken, checkRole('emprendedor'), createContentController);
router.put("/id", uploadFiles, verifyToken, checkRole('emprendedor'), updateContentController);
router.delete("/delete/:finca_id", verifyToken, checkRole('emprendedor'), deleteContentController);
router.get("/finca", verifyToken, checkRole('emprendedor'), getContentByIdController);



export default router;
