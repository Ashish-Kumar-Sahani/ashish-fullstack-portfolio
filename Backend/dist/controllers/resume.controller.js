"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResumeStats = exports.downloadResume = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ResumeDownload_1 = __importDefault(require("../models/ResumeDownload"));
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const downloadResume = async (req, res) => {
    try {
        const settings = await SiteSettings_1.default.findOne();
        if (!settings?.resumeUrl) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        await ResumeDownload_1.default.create({
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
        });
        const localPath = path_1.default.join(__dirname, "../../uploads/Ashish_Kumar_Resume.pdf");
        let buffer;
        if (fs_1.default.existsSync(localPath)) {
            buffer = fs_1.default.readFileSync(localPath);
        }
        else {
            const response = await fetch(settings.resumeUrl);
            if (!response.ok) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to retrieve resume file from storage",
                });
            }
            const arrayBuffer = await response.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        }
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=Ashish_Kumar_Resume.pdf");
        res.send(buffer);
    }
    catch (error) {
        console.error("Resume download error:", error);
        res.status(500).json({
            success: false,
            message: "Resume download failed",
        });
    }
};
exports.downloadResume = downloadResume;
const getResumeStats = async (_req, res) => {
    const downloads = await ResumeDownload_1.default.countDocuments();
    res.json({
        success: true,
        downloads,
    });
};
exports.getResumeStats = getResumeStats;
