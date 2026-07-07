"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resume_controller_1 = require("../controllers/resume.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/download", resume_controller_1.downloadResume);
router.get("/stats", auth_middleware_1.protect, resume_controller_1.getResumeStats);
exports.default = router;
