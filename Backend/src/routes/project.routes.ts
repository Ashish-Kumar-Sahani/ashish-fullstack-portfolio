import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getProjectBySlug,
  updateProject,
} from "../controllers/project.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getProjects);
router.get("/slug/:slug", getProjectBySlug);
router.get("/:id", getProjectById);

router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;