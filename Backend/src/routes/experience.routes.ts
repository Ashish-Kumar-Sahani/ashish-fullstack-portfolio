import { Router } from "express";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../controllers/experience.controller";
import {protect} from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createExperience);
router.get("/", getExperiences);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

export default router;