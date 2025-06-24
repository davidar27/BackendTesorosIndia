import express from "express";
import { getPacksController } from "@/controllers/Package/getPackagesController";

const router = express.Router();

router.get("/", getPacksController);
router.get("/?search", getPacksController);

export default router;