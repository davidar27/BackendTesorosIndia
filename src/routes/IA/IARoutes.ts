import { IAController } from "@/controllers/IA/IAController";
import IARegisteredController from "@/controllers/IA/IARegisteredController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import express from "express";

const router = express.Router();

router.post("/", IAController)
router.post("/registrado", authMiddlewareToken, IARegisteredController)

export default router;