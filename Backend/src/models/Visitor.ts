import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    page: String,
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);