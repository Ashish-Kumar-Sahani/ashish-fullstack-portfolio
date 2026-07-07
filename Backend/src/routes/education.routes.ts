import { Router } from "express";
import {
  createEducation,
  deleteEducation,
  getEducations,
  updateEducation,
} from "../controllers/education.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getEducations);
router.post("/", protect, createEducation);
router.put("/:id", protect, updateEducation);
router.delete("/:id", protect, deleteEducation);

export default router;