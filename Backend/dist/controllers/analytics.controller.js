"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const Contact_1 = __importDefault(require("../models/Contact"));
const ResumeDownload_1 = __importDefault(require("../models/ResumeDownload"));
const getAnalytics = async (_req, res) => {
    const projects = await Project_1.default.countDocuments();
    const messages = await Contact_1.default.countDocuments();
    const downloads = await ResumeDownload_1.default.countDocuments();
    res.json({
        success: true,
        data: [
            {
                name: "Projects",
                value: projects,
            },
            {
                name: "Messages",
                value: messages,
            },
            {
                name: "Downloads",
                value: downloads,
            },
        ],
    });
};
exports.getAnalytics = getAnalytics;
