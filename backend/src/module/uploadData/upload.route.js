import { Router } from "express";
import { uploadDataController } from "./upload.controller.js";
import multer from "multer";

const router = Router();

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", uploadDataController.uploadData);
router.post("/upload-file", upload.single("file"), uploadDataController.uploadFile);
router.get("/", uploadDataController.getAllData);

export default router;
