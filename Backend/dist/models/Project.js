"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    images: [{ type: String }],
    technologies: [{ type: String }],
    category: { type: String, default: "Full Stack" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["completed", "in-progress", "planned"],
        default: "completed",
    },
    views: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Project", projectSchema);
