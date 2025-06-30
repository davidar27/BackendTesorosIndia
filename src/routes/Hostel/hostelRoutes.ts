import { getHostelsController } from "@/controllers/Hostel/getHostelsController";
import { reserveController } from "@/controllers/Hostel/reserveController";
import express from "express";

const router = express.Router();

router.get("/", getHostelsController);
router.post("/reservar/:hostel_id", reserveController);

export default router;