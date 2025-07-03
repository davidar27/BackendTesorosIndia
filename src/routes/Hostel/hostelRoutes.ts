import { getHostelsController } from "@/controllers/Hostel/getHostelsController";
import { getRoomsByHostelController } from "@/controllers/Hostel/getRoomsByHostelController";
import express from "express";

const router = express.Router();

router.get("/", getHostelsController);
router.get("/:hostel_id/rooms", getRoomsByHostelController);

export default router;