"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.getContacts = exports.createContact = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const createContact = async (req, res) => {
    try {
        const contact = await Contact_1.default.create(req.body);
        await (0, sendEmail_1.default)("New Portfolio Contact Message", `
  <h2>New Contact Message</h2>
  <p><b>Name:</b> ${contact.name}</p>
  <p><b>Email:</b> ${contact.email}</p>
  <p><b>Subject:</b> ${contact.subject}</p>
  <p><b>Message:</b> ${contact.message}</p>
  `);
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: contact,
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
};
exports.createContact = createContact;
const getContacts = async (_req, res) => {
    const contacts = await Contact_1.default.find().sort({ createdAt: -1 });
    res.json({
        success: true,
        count: contacts.length,
        data: contacts,
    });
};
exports.getContacts = getContacts;
const deleteContact = async (req, res) => {
    await Contact_1.default.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        message: "Message deleted successfully",
    });
};
exports.deleteContact = deleteContact;
