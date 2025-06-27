import { getNotificationsController } from "@/controllers/Notification/getNotificationController";
import { setViewNotificationsController } from "@/controllers/Notification/setViewNotificationsController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import express from "express";

const router = express.Router();

router.get("/", authMiddlewareToken, getNotificationsController);
router.patch("/", authMiddlewareToken, setViewNotificationsController);

export default router;