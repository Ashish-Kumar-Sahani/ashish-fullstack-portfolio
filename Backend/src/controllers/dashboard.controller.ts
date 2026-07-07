import { Request, Response } from "express";

import Project from "../models/Project";
import Skill from "../models/Skill";
import Service from "../models/Service";
import Contact from "../models/Contact";
import Visitor from "../models/Visitor";
import ResumeDownload from "../models/ResumeDownload";

export const getDashboardStats = async (
  _req: Request,
  res: Response
) => {
  try {
    const todayStart = new Date();

    todayStart.setHours(0, 0, 0, 0);

    const [
      projects,
      skills,
      services,
      messages,
      visitors,
      todayVisitors,
      resumeDownloads,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
      Visitor.countDocuments(),
      Visitor.countDocuments({
        createdAt: {
          $gte: todayStart,
        },
      }),
      ResumeDownload.countDocuments(),
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
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};