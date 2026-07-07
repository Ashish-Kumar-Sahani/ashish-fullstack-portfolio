import { Request, Response } from "express";
import https from "https";
import ResumeDownload from "../models/ResumeDownload";
import SiteSettings from "../models/SiteSettings";

export const downloadResume = async (
  req: Request,
  res: Response
) => {
  try {
    const settings = await SiteSettings.findOne();

    if (!settings?.resumeUrl) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await ResumeDownload.create({
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    https.get(settings.resumeUrl, (cloudinaryRes) => {
      if (cloudinaryRes.statusCode !== 200) {
        return res.status(500).json({
          success: false,
          message: "Failed to download resume file",
        });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=Ashish_Kumar_Resume.pdf");
      cloudinaryRes.pipe(res);
    }).on("error", (error) => {
      console.error("Resume stream error:", error);
      res.status(500).json({
        success: false,
        message: "Resume download failed",
      });
    });

  } catch (error) {
    console.error("Resume download error:", error);
    res.status(500).json({
      success: false,
      message: "Resume download failed",
    });
  }
};

export const getResumeStats = async (
  _req: Request,
  res: Response
) => {
  const downloads =
    await ResumeDownload.countDocuments();

  res.json({
    success: true,
    downloads,
  });
};