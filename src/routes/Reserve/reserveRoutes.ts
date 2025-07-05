import { cancelReserveController } from "@/controllers/Reserve/cancelReserveController";
import { getReservesByHostelController } from "@/controllers/Reserve/getReservesByHostelController";
import { getReservesByUserController } from "@/controllers/Reserve/getReservesByUserController";
import { reserveController } from "@/controllers/Reserve/reserveController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import express from "express";

const router = express.Router();

router.get("/cliente", authMiddlewareToken, checkRole("cliente"), getReservesByUserController);
router.get("/hostal/:hostel_id", authMiddlewareToken, checkRole("emprendedor"), getReservesByHostelController);
router.post("/reservar/:room_id", authMiddlewareToken, checkRole("cliente"), reserveController);
// GET para permitir el consumo en correo mediante <a/>
router.get("/cancelar", authMiddlewareToken, checkRole("cliente"), cancelReserveController);

export default router;