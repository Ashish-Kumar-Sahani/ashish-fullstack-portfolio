import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    images: [{ type: String }],
    technologies: [{ type: String }],
    category: { type: String, default: "Full Stack" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: {
    type: String,
    enum: ["completed", "in-progress", "planned"],
    default: "completed",
    },
    views: { type: Number, default: 0 },
},
{ timestamps: true }
);

export default mongoose.model("Project", projectSchema);