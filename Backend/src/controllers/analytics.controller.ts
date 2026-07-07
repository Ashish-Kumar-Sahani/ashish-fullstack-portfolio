import { Request, Response } from "express";
import Project from "../models/Project";
import Contact from "../models/Contact";
import ResumeDownload from "../models/ResumeDownload";

export const getAnalytics = async (
  _req: Request,
  res: Response
) => {
  const projects = await Project.countDocuments();
  const messages = await Contact.countDocuments();
  const downloads =
    await ResumeDownload.countDocuments();

  res.json({
    success: true,
    data: [
      {
        name: "Projects",
        value: projects,
      },
      {
        name: "Messages",
        value: messages,
      },
      {
        name: "Downloads",
        value: downloads,
      },
    ],
  });
};