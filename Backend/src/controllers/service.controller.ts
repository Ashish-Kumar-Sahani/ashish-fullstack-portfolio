import { Request, Response } from "express";
import Service from "../models/Service";

export const createService = async (req: Request, res: Response) => {
  const data = await Service.create(req.body);
  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data,
  });
};

export const getServices = async (_req: Request, res: Response) => {
  const data = await Service.find().sort({ displayOrder: 1 });
  res.json({
    success: true,
    count: data.length,
    data,
  });
};

export const updateService = async (req: Request, res: Response) => {
  const data = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    message: "Service updated successfully",
    data,
  });
};

export const deleteService = async (req: Request, res: Response) => {
  await Service.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Service deleted successfully",
  });
};