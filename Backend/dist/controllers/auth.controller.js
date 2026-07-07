"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getProfile = exports.loginAdmin = exports.registerAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const adminCount = await User_1.default.countDocuments();
        if (adminCount > 0) {
            return res.status(403).json({
                success: false,
                message: "Admin registration is disabled",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "super_admin",
        });
        return res.status(201).json({
            success: true,
            message: "Super admin created successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: (0, generateToken_1.default)(user._id.toString()),
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Admin registration failed",
            error: error.message,
        });
    }
};
exports.registerAdmin = registerAdmin;
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const user = await User_1.default.findOne({ email: normalizedEmail }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                debug: "User not found with this email",
            });
        }
        if (!user.password) {
            return res.status(500).json({
                success: false,
                message: "Password field missing from database",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                debug: "Password does not match",
            });
        }
        if (user.role !== "super_admin" && user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: (0, generateToken_1.default)(user._id.toString()),
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Admin login failed",
            error: error.message,
        });
    }
};
exports.loginAdmin = loginAdmin;
const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            data: req.user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Profile fetch failed",
            error: error.message,
        });
    }
};
exports.getProfile = getProfile;
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password and new password are required",
            });
        }
        const user = await User_1.default.findById(req.user._id).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }
        user.password = await bcryptjs_1.default.hash(newPassword, 10);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Password change failed",
            error: error.message,
        });
    }
};
exports.changePassword = changePassword;
