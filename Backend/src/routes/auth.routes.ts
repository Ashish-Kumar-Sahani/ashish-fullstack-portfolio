import { Router } from "express";

import { 
    loginAdmin,
    registerAdmin,
    getProfile,
    changePassword,
 } from "../controllers/auth.controller";
 import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);

export default router;