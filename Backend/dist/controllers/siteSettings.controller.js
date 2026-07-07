"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSettings = exports.getSettings = void 0;
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const getSettings = async (_req, res) => {
    const settings = await SiteSettings_1.default.findOne();
    res.json({
        success: true,
        data: settings,
    });
};
exports.getSettings = getSettings;
const saveSettings = async (req, res) => {
    let settings = await SiteSettings_1.default.findOne();
    if (!settings) {
        settings = await SiteSettings_1.default.create(req.body);
    }
    else {
        settings = await SiteSettings_1.default.findByIdAndUpdate(settings._id, req.body, {
            new: true,
        });
    }
    res.json({
        success: true,
        data: settings,
    });
};
exports.saveSettings = saveSettings;
