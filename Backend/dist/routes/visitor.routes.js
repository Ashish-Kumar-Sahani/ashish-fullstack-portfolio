"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitor_controller_1 = require("../controllers/visitor.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/track", visitor_controller_1.trackVisitor);
router.get("/stats", auth_middleware_1.protect, visitor_controller_1.getVisitorStats);
exports.default = router;
