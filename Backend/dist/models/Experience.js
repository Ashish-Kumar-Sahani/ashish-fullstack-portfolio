"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const experienceSchema = new mongoose_1.default.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, default: "" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "Present" },
    description: { type: String, default: "" },
    technologies: [{ type: String }],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Experience", experienceSchema);
