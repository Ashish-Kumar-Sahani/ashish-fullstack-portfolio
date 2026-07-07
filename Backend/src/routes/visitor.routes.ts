import { Router } from "express";
import { trackVisitor, getVisitorStats } from "../controllers/visitor.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/track", trackVisitor);
router.get("/stats", protect, getVisitorStats);

export default router;