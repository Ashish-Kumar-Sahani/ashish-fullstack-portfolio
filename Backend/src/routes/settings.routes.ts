import { Router } from "express";

import {
  getSettings,
  saveSettings,
} from "../controllers/siteSettings.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getSettings);

router.put("/", protect, saveSettings);

export default router;