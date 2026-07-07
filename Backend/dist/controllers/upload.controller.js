"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = exports.uploadImage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const uploadBufferToCloudinary = (buffer, options) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            ...options,
            timeout: 120000,
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        stream.end(buffer);
    });
};
const uploadImage = async (req, res) => {
    try {
        console.log("Upload file:", req.file?.originalname, req.file?.mimetype, req.file?.size);
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }
        const result = await uploadBufferToCloudinary(req.file.buffer, {
            folder: "portfolio/images",
            resource_type: "image",
        });
        res.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
        });
    }
    catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({
            success: false,
            message: "Image upload failed",
        });
    }
};
exports.uploadImage = uploadImage;
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded",
            });
        }
        const result = await uploadBufferToCloudinary(req.file.buffer, {
            folder: "portfolio/resume",
            resource_type: "raw",
            public_id: "Ashish_Kumar_Resume.pdf",
            overwrite: true,
            unique_filename: false,
        });
        // Save local copy as fallback in case Cloudinary delivery settings are restricted
        const uploadsDir = path_1.default.join(__dirname, "../../uploads");
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
        fs_1.default.writeFileSync(path_1.default.join(uploadsDir, "Ashish_Kumar_Resume.pdf"), req.file.buffer);
        // Save the resume URL to SiteSettings
        await SiteSettings_1.default.findOneAndUpdate({}, { resumeUrl: result.secure_url }, { upsert: true, new: true });
        res.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
        });
    }
    catch (error) {
        console.error("Resume upload error:", error);
        res.status(500).json({
            success: false,
            message: "Resume upload failed",
        });
    }
};
exports.uploadResume = uploadResume;
