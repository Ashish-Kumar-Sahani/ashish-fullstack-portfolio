"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const resumeDownloadSchema = new mongoose_1.default.Schema({
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    downloadedAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.default = mongoose_1.default.model("ResumeDownload", resumeDownloadSchema);
