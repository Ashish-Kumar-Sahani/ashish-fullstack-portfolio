import { Router } from "express";
import {
  downloadResume,
  getResumeStats,
} from "../controllers/resume.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/download", downloadResume);

router.get(
  "/stats",
  protect,
  getResumeStats
);

export default router;