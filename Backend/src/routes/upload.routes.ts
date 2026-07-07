import { Router } from "express";
import {
  uploadImage,
  uploadResume,
} from "../controllers/upload.controller";
import { upload } from "../middleware/upload.middleware";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/image", protect, upload.single("image"), uploadImage);
router.post("/resume", protect, upload.single("resume"), uploadResume);

export default router;