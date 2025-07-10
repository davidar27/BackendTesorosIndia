import { getNotificationsController } from "@/controllers/Notification/getNotificationController";
import { setViewNotificationsController } from "@/controllers/Notification/setViewNotificationsController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import express from "express";

const router = express.Router();

router.get("/:userId", authMiddlewareToken, getNotificationsController);
router.patch("/:userId/marcar", authMiddlewareToken, setViewNotificationsController);

export default router;