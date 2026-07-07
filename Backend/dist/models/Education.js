"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const educationSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Education", educationSchema);
