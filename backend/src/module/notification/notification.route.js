import { Router } from "express";
import { getNotificationsForUser, markAsRead } from "./notification.service.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, async (req, res) => {
    try {
        const notifications = await getNotificationsForUser(req.user._id);
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:id/read", protect, async (req, res) => {
    try {
        const notification = await markAsRead(req.params.id);
        res.status(200).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
