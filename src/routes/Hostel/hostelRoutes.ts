import { getHostelsController } from "@/controllers/Hostel/getHostelsController";
import { getRoomsByHostelController } from "@/controllers/Hostel/getRoomsByHostelController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import { checkRole } from "@/middleware/Auth/checkRole";
import express from "express";

const router = express.Router();

router.get("/", getHostelsController);
router.get("/:hostel_id", getRoomsByHostelController);

export default router;