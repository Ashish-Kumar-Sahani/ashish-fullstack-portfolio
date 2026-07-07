import { Router } from "express";
import {
createSkill,
deleteSkill,
getSkills,
updateSkill,
} from "../controllers/skill.controller";
import {protect} from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect,createSkill);
router.get("/", getSkills);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;