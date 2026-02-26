
import express from "express";
import * as chatController from "./chat.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/save", protect, chatController.saveChat);
router.get("/history", protect, chatController.getHistory);
router.delete("/:id", protect, chatController.deleteChat);

export default router;
