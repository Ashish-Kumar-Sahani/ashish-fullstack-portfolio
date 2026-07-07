import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, default: "" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "Present" },
    description: { type: String, default: "" },
    technologies: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);