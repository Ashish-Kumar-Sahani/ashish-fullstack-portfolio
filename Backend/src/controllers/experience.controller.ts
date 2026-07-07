import { Request, Response } from "express";
import Experience from "../models/Experience";

export const createExperience = async (req: Request, res: Response) => {
  const data = await Experience.create(req.body);

  res.status(201).json({
    success: true,
    message: "Experience created successfully",
    data,
  });
};

export const getExperiences = async (_req: Request, res: Response) => {
  const data = await Experience.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: data.length,
    data,
  });
};

export const updateExperience = async (req: Request, res: Response) => {
  const data = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    message: "Experience updated successfully",
    data,
  });
};

export const deleteExperience = async (req: Request, res: Response) => {
  await Experience.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Experience deleted successfully",
  });
};