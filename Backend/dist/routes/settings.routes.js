"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const siteSettings_controller_1 = require("../controllers/siteSettings.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", siteSettings_controller_1.getSettings);
router.put("/", auth_middleware_1.protect, siteSettings_controller_1.saveSettings);
exports.default = router;
