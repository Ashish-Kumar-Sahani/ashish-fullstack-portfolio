"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const dbMode = process.env.DB_MODE || "local";
        const mongoUri = dbMode === "local"
            ? process.env.MONGO_URI_LOCAL
            : process.env.MONGO_URI_ATLAS;
        if (!mongoUri?.trim()) {
            throw new Error(`Mongo URI missing. DB_MODE=${dbMode}`);
        }
        await mongoose_1.default.connect(mongoUri);
        console.log("✅ MongoDB Connected");
        console.log("📦 Mode:", dbMode);
        console.log("📦 Database:", mongoose_1.default.connection.name);
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
