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

// ===== RUTAS PÚBLICAS =====

// Rutas estáticas (sin parámetros) - deben ir ANTES de las rutas con parámetros
router.get('/mapa', getLocationExperiencesController);
router.get('/buscar', searchExperiencesController);
router.get('/nombre', getAllNamesExperienceController);
router.get('/', getAllExperienceController);

// Rutas con parámetros
router.get('/categorias/:categoryId', getExperiencesByCategoryController);
router.get('/informacion/:experience_id', getInfoExperienceController);
router.get('/miembros/:experience_id', getExperienceMembersController);
router.get('/productos/:experience_id', getProductsExperienceController);
router.get('/valoraciones/:experience_id', getReviewsExperienceController);

// ===== RUTAS PRIVADAS =====

// Rutas estáticas privadas
router.get('/mi-experiencia', authMiddlewareToken, checkRole('emprendedor'), getMyExperienceController);

// Rutas con parámetros privadas
router.put("/actualizar-informacion/:experience_id", uploadSingleFile, authMiddlewareToken, checkRole('emprendedor'), updateInfoExperienceController);
router.put("/estado/:experience_id", authMiddlewareToken, checkRole('emprendedor'), updateStatusExperienceController);
router.delete("/eliminar/:id", authMiddlewareToken, checkRole('emprendedor'), deleteExperienceController);

// ===== RUTAS DE INTEGRANTES =====

// Rutas de integrantes con parámetros
router.post("/miembros/:experience_id", uploadSingleFile, authMiddlewareToken, checkRole('emprendedor'), addMemberController);
router.put("/miembros/:memberId", uploadSingleFile, authMiddlewareToken, checkRole('emprendedor'), updateMemberController);
router.delete("/miembros/:memberId", authMiddlewareToken, checkRole('emprendedor'), deleteMemberController);

export default router;
