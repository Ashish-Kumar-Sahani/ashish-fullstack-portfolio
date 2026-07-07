import { Request, Response } from "express";
import SiteSettings from "../models/SiteSettings";

export const getSettings = async (
  _req: Request,
  res: Response
) => {
  const settings = await SiteSettings.findOne();

  res.json({
    success: true,
    data: settings,
  });
};

export const saveSettings = async (
  req: Request,
  res: Response
) => {
  let settings = await SiteSettings.findOne();

  if (!settings) {
    settings = await SiteSettings.create(req.body);
  } else {
    settings = await SiteSettings.findByIdAndUpdate(
      settings._id,
      req.body,
      {
        new: true,
      }
    );
  }

  res.json({
    success: true,
    data: settings,
  });
};