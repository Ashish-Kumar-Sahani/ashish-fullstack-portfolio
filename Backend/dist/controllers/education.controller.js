"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.updateEducation = exports.getEducations = exports.createEducation = void 0;
const Education_1 = __importDefault(require("../models/Education"));
const createEducation = async (req, res) => {
    const data = await Education_1.default.create(req.body);
    res.status(201).json({ success: true, data });
};
exports.createEducation = createEducation;
const getEducations = async (_req, res) => {
    const data = await Education_1.default.find().sort({ displayOrder: 1 });
    res.json({ success: true, data });
};
exports.getEducations = getEducations;
const updateEducation = async (req, res) => {
    const data = await Education_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json({ success: true, data });
};
exports.updateEducation = updateEducation;
const deleteEducation = async (req, res) => {
    await Education_1.default.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Education deleted successfully" });
};
exports.deleteEducation = deleteEducation;
