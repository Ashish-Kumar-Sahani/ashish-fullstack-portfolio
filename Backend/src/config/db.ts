import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbMode = process.env.DB_MODE || "local";

    const mongoUri =
      dbMode === "local"
        ? process.env.MONGO_URI_LOCAL
        : process.env.MONGO_URI_ATLAS;

    if (!mongoUri?.trim()) {
      throw new Error(
        `Mongo URI missing. DB_MODE=${dbMode}`
      );
    }

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected");
    console.log("📦 Mode:", dbMode);
    console.log("📦 Database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;