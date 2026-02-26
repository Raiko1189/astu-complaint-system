import { Router } from "express";
import uploadDataRoute from "./module/uploadData/upload.route.js"
import ragRoute from "./module/rag/rag.route.js"
import authRoute from "./module/auth/auth.route.js"
import notificationRoute from "./module/notification/notification.route.js"
import complaintRoute from "./module/complaint/complaint.route.js"
import officeRoute from "./module/office/office.route.js"
import { protect, authorize } from "./middlewares/auth.middleware.js"

const router = Router()

router.use("/auth", authRoute)
router.use("/complaints", complaintRoute)
router.use("/notifications", notificationRoute)
router.use("/offices", officeRoute)
router.use("/upload", protect, authorize("admin"), uploadDataRoute)
router.use("/query", ragRoute)



export default router
