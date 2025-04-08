import express from "express";
import { verifyToken } from "../../middleware/Auth/verifyToken";
import { checkRole } from "../../middleware/Auth/checkRole";
import { uploadFiles } from "../../config/multerConfig";
import { createContentController } from "../../controllers/content/createContentController";
import { updateContentController } from "../../controllers/content/updateContentController";
import { deleteContentController } from "../../controllers/content/deleteContentController";
import { getContentByIdController } from "../../controllers/content/getContentByIdController";
import { getAllContentController } from "../../controllers/content/getAllContentController";

const router = express.Router();

router.post("/create", uploadFiles, verifyToken, checkRole('emprendedor'), createContentController);
router.put("/update/:id", uploadFiles, verifyToken, checkRole('emprendedor'), updateContentController);
router.delete("/delete/:id", verifyToken, checkRole('emprendedor'), deleteContentController);
router.get("/get:id", verifyToken, checkRole('emprendedor'), getContentByIdController);
router.get("/fincas", verifyToken, checkRole('emprendedor'), getAllContentController);


export default router;
