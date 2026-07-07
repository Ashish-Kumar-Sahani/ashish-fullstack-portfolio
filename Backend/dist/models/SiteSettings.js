"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const siteSettingsSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("SiteSettings", siteSettingsSchema);
