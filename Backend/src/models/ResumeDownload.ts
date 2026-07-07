import mongoose from "mongoose";

const resumeDownloadSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    downloadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("ResumeDownload", resumeDownloadSchema);