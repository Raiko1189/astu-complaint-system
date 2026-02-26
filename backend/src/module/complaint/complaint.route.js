import express from "express";
import * as complaintController from "./complaint.controller.js";
import { protect, authorize } from "../../middlewares/auth.middleware.js";

import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.use(protect);

// Student routes
router.post("/submit", authorize("student"), upload.array("images", 5), complaintController.submitComplaint);
router.get("/my", authorize("student"), complaintController.getMyComplaints);

// Staff routes
router.patch("/:id/status", authorize("staff", "admin"), complaintController.updateStatus);
router.get("/admin/all", authorize("staff", "admin"), complaintController.getAllComplaints);

// Admin routes
router.get("/admin/stats", authorize("admin"), complaintController.getStats);

export default router;
