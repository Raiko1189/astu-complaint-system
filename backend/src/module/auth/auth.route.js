import { Router } from "express";
import { login, register, getMe, googleLogin } from "./auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

console.log(`[DEBUG] auth.route.js loaded. login type: ${typeof login}, register type: ${typeof register}`);

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/me", protect, getMe);


export default router;


