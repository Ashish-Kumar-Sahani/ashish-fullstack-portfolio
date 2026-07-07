"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectBySlug = exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const createProject = async (req, res) => {
    try {
        const project = await Project_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create project",
            error,
        });
    }
};
exports.createProject = createProject;
const getProjects = async (_req, res) => {
    try {
        const projects = await Project_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error,
        });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error,
        });
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const project = await Project_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update project",
            error,
        });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const project = await Project_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error,
        });
    }
};
exports.deleteProject = deleteProject;
const getProjectBySlug = async (req, res) => {
    try {
        const project = await Project_1.default.findOne({ slug: req.params.slug });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.json({
            success: true,
            data: project,
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Failed to fetch project",
        });
    }
};
exports.getProjectBySlug = getProjectBySlug;
