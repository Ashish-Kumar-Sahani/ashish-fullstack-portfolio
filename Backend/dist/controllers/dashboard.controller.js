"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const Skill_1 = __importDefault(require("../models/Skill"));
const Service_1 = __importDefault(require("../models/Service"));
const Contact_1 = __importDefault(require("../models/Contact"));
const Visitor_1 = __importDefault(require("../models/Visitor"));
const ResumeDownload_1 = __importDefault(require("../models/ResumeDownload"));
const getDashboardStats = async (_req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const [projects, skills, services, messages, visitors, todayVisitors, resumeDownloads,] = await Promise.all([
            Project_1.default.countDocuments(),
            Skill_1.default.countDocuments(),
            Service_1.default.countDocuments(),
            Contact_1.default.countDocuments(),
            Visitor_1.default.countDocuments(),
            Visitor_1.default.countDocuments({
                createdAt: {
                    $gte: todayStart,
                },
            }),
            ResumeDownload_1.default.countDocuments(),
        ]);
        res.status(200).json({
            success: true,
            data: {
                projects,
                skills,
                services,
                messages,
                visitors,
                todayVisitors,
                resumeDownloads,
            },
        });
    }
    catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to load dashboard stats",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
