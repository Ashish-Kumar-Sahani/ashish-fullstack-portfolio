import { Router } from "express";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../controllers/service.controller";
import {protect} from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createService);
router.get("/", getServices);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

export default router;