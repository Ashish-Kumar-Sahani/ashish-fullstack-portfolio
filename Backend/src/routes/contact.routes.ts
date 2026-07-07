import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContacts,
} from "../controllers/contact.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", createContact);
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);

export default router;