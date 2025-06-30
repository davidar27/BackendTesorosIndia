import { getReservesByUserController } from "@/controllers/Reserve/getReservesByUserController";
import { reserveController } from "@/controllers/Reserve/reserveController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import express from "express";

const router = express.Router();

router.get("/cliente", authMiddlewareToken, checkRole("cliente"), getReservesByUserController);
router.post("/reservar/:room_id", authMiddlewareToken, checkRole("cliente"), reserveController);

export default router;