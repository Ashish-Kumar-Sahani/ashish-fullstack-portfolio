import { Request, Response } from "express";
import Skill from "../models/Skill";

export const createSkill = async (req: Request, res: Response) => {
  const data = await Skill.create(req.body);
  res.status(201).json({ success: true, data });
};

export const getSkills = async (_req: Request, res: Response) => {
  const data = await Skill.find().sort({ displayOrder: 1 });
  res.json({ success: true, count: data.length, data });
};

export const updateSkill = async (req: Request, res: Response) => {
  const data = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json({ success: true, data });
};

export const deleteSkill = async (req: Request, res: Response) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Skill deleted successfully" });
};