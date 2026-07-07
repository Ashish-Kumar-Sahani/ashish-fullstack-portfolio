import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    educationType: {
      type: String,
      enum: ["school", "college"],
      default: "college",
      required: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    boardOrUniversity: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    startYear: {
      type: String,
      required: true,
    },

    endYear: {
      type: String,
      required: true,
    },

    grade: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);