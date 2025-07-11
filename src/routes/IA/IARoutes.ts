import { IAController } from "@/controllers/IA/IAController";
import IARegisteredController from "@/controllers/IA/IARegisteredController";
import { generatePDFReportController, getAvailableReportTypesController, downloadEntrepreneurPDFController } from "@/controllers/IA/PDFReportController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import express from "express";

const router = express.Router();

router.post("/", IAController)
router.post("/registrado", authMiddlewareToken, IARegisteredController)

// Rutas para informes PDF
router.get("/reportes/tipos", authMiddlewareToken, getAvailableReportTypesController);
router.post("/reportes/generar", authMiddlewareToken, checkRole(['emprendedor']), generatePDFReportController);
router.get("/reportes/descargar", authMiddlewareToken, checkRole(['emprendedor']), downloadEntrepreneurPDFController);

export default router;