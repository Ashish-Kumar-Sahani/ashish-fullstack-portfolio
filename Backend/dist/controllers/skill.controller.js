"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.getSkills = exports.createSkill = void 0;
const Skill_1 = __importDefault(require("../models/Skill"));
const createSkill = async (req, res) => {
    const data = await Skill_1.default.create(req.body);
    res.status(201).json({ success: true, data });
};
exports.createSkill = createSkill;
const getSkills = async (_req, res) => {
    const data = await Skill_1.default.find().sort({ displayOrder: 1 });
    res.json({ success: true, count: data.length, data });
};
exports.getSkills = getSkills;
const updateSkill = async (req, res) => {
    const data = await Skill_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.json({ success: true, data });
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    await Skill_1.default.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Skill deleted successfully" });
};
exports.deleteSkill = deleteSkill;
