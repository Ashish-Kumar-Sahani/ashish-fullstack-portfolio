"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getServices = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const createService = async (req, res) => {
    const data = await Service_1.default.create(req.body);
    res.status(201).json({
        success: true,
        message: "Service created successfully",
        data,
    });
};
exports.createService = createService;
const getServices = async (_req, res) => {
    const data = await Service_1.default.find().sort({ displayOrder: 1 });
    res.json({
        success: true,
        count: data.length,
        data,
    });
};
exports.getServices = getServices;
const updateService = async (req, res) => {
    const data = await Service_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.json({
        success: true,
        message: "Service updated successfully",
        data,
    });
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
    await Service_1.default.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        message: "Service deleted successfully",
    });
};
exports.deleteService = deleteService;
