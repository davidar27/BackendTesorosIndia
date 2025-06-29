import { getHostelsController } from "@/controllers/Hostel/getHostelsController";
import express from "express";

const router = express.Router();

router.get("/", getHostelsController);

export default router;