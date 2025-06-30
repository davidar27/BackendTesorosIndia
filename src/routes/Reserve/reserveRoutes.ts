import { reserveController } from "@/controllers/Reserve/reserveController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import express from "express";

const router = express.Router();

router.post("/reservar/:room_id", authMiddlewareToken, checkRole("cliente"), reserveController);

export default router;