import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "tools", "cloud", "other"],
      default: "other",
    },
    level: { type: Number, min: 1, max: 100, default: 70 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);