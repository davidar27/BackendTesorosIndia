import express from "express";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import { uploadFiles } from "@/config/multerConfig";
import { updateExperienceController } from "@/controllers/Experience/updateExperienceController";
import { deleteExperienceController } from "@/controllers/Experience/deleteExperienceController";
import { getExperienceByIdController } from "@/controllers/Experience/getExperienceByIdController";
import { getAllExperienceController } from "@/controllers/Experience/getAllExperienceController";
import { getExperiencesByCategoryController } from "@/controllers/Experience/getExperiencesByCategoryController";
import { getMyExperienceController } from "@/controllers/Experience/getMyExperienceController";
import { getAllNamesExperienceController } from "@/controllers/Experience/getAllNamesExperienceController";
import { getLocationExperiencesController } from "@/controllers/Experience/getLocationExperiencesController";
import { getInfoExperienceController } from "@/controllers/Experience/getInfoExperienceController";

const router = express.Router();

// Rutas públicas de experiencias
router.get('/mapa', getLocationExperiencesController);
router.get('/:id_experience', getInfoExperienceController);
router.get('/', getAllExperienceController);
router.get('/nombre?', getAllNamesExperienceController);
router.get('/:id', getExperienceByIdController);
router.get('/categorias/:categoryId', getExperiencesByCategoryController);

// Rutas privadas de experiencias
router.get('/mi-experiencia', authMiddlewareToken, checkRole('emprendedor'), getMyExperienceController);

router.put("/actualizar/:id", uploadFiles, authMiddlewareToken, checkRole('emprendedor'), updateExperienceController);
router.delete("/eliminar/:id", authMiddlewareToken, checkRole('emprendedor'), deleteExperienceController);

// router.get("/experiencias/emprendedor", authMiddlewareToken, checkRole('emprendedor'), getAllExperienceByEmprendedorController);

export default router;
