import express from "express";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import { uploadSingleFile } from "@/config/multerConfig";
import { updateInfoExperienceController } from "@/controllers/Experience/updateInfoExperienceController";
import { deleteExperienceController } from "@/controllers/Experience/deleteExperienceController";
import { getAllExperienceController } from "@/controllers/Experience/getAllExperienceController";
import { getExperiencesByCategoryController } from "@/controllers/Experience/getExperiencesByCategoryController";
import { getMyExperienceController } from "@/controllers/Experience/getMyExperienceController";
import { getAllNamesExperienceController } from "@/controllers/Experience/getAllNamesExperienceController";
import { getLocationExperiencesController } from "@/controllers/Experience/getLocationExperiencesController";
import { getInfoExperienceController } from "@/controllers/Experience/getInfoExperienceController";
import { getExperienceMembersController } from "@/controllers/Experience/getExperienceMembersController";
import { getProductsExperienceController } from "@/controllers/Experience/getProductsExperienceController";
import { getReviewsExperienceController } from "@/controllers/Experience/getReviewsExperienceController";
import { searchExperiencesController } from "@/controllers/Experience/searchExperiencesController";
import { addMemberController } from "@/controllers/Experience/Members/addMemberController";
import { updateMemberController } from "@/controllers/Experience/Members/updateMemberController";
import { deleteMemberController } from "@/controllers/Experience/Members/deleteMemberController";
import updateStatusExperienceController from "@/controllers/Experience/updateStatusExperienceController";

const router = express.Router();

// Rutas públicas de experiencias
router.get('/mapa', getLocationExperiencesController);

// Ruta de búsqueda de experiencias
router.get('/buscar', searchExperiencesController);

router.get('/informacion/:experience_id', getInfoExperienceController);
router.get('/miembros/:experience_id', getExperienceMembersController);
router.get('/productos/:experience_id', getProductsExperienceController);
router.get('/valoraciones/:experience_id', getReviewsExperienceController);

router.get('/nombre', getAllNamesExperienceController);
router.get('/categorias/:categoryId', getExperiencesByCategoryController);

// Rutas privadas de experiencias
router.get('/mi-experiencia', authMiddlewareToken, checkRole('emprendedor'), getMyExperienceController);

// actualizar experiencia
router.put("/actualizar-informacion/:experience_id", uploadSingleFile, authMiddlewareToken, checkRole('emprendedor'), updateInfoExperienceController);
router.put("/estado/:experience_id", authMiddlewareToken, checkRole('emprendedor'), updateStatusExperienceController);
// rutas de integrantes
router.post("/miembros/:experience_id", uploadSingleFile, authMiddlewareToken, checkRole('emprendedor'), addMemberController);
router.put("/miembros/:member_id", uploadSingleFile, authMiddlewareToken, checkRole('emprendedor'), updateMemberController);
router.delete("/miembros/:member_id", authMiddlewareToken, checkRole('emprendedor'), deleteMemberController);

router.delete("/eliminar/:id", authMiddlewareToken, checkRole('emprendedor'), deleteExperienceController);

router.get('/', getAllExperienceController);

export default router;
