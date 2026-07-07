import { Request, Response } from "express";
import Education from "../models/Education";

export const createEducation = async (req: Request, res: Response) => {
  const data = await Education.create(req.body);
  res.status(201).json({ success: true, data });
};

export const getEducations = async (_req: Request, res: Response) => {
  const data = await Education.find().sort({ displayOrder: 1 });
  res.json({ success: true, data });
};

export const updateEducation = async (req: Request, res: Response) => {
  const data = await Education.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({ success: true, data });
};

export const deleteEducation = async (req: Request, res: Response) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Education deleted successfully" });
};