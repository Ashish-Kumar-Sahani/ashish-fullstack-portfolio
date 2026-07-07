"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.getExperiences = exports.createExperience = void 0;
const Experience_1 = __importDefault(require("../models/Experience"));
const createExperience = async (req, res) => {
    const data = await Experience_1.default.create(req.body);
    res.status(201).json({
        success: true,
        message: "Experience created successfully",
        data,
    });
};
exports.createExperience = createExperience;
const getExperiences = async (_req, res) => {
    const data = await Experience_1.default.find().sort({ createdAt: -1 });
    res.json({
        success: true,
        count: data.length,
        data,
    });
};
exports.getExperiences = getExperiences;
const updateExperience = async (req, res) => {
    const data = await Experience_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.json({
        success: true,
        message: "Experience updated successfully",
        data,
    });
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res) => {
    await Experience_1.default.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        message: "Experience deleted successfully",
    });
};
exports.deleteExperience = deleteExperience;
