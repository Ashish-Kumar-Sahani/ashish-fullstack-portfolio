import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    fullName: String,
    title: String,
    shortBio: String,

    email: String,
    phone: String,
    location: String,

    github: String,
    linkedin: String,
    twitter: String,

    profileImage: String,
    resumeUrl: String,

    heroTitle: String,
    heroDescription: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SiteSettings",
  siteSettingsSchema
);