import { getHostelsController } from "@/controllers/Hostel/getHostelsController";
import { getRoomsByHostelController } from "@/controllers/Hostel/getRoomsByHostelController";
import { reserveController } from "@/controllers/Hostel/reserveController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import express from "express";

const router = express.Router();

router.get("/", authMiddlewareToken, checkRole("cliente"), getHostelsController);
router.get("/:hostel_id", authMiddlewareToken, checkRole("cliente"), getRoomsByHostelController);
router.post("/reservar/:room_id", authMiddlewareToken, checkRole("cliente"), reserveController);

export default router;