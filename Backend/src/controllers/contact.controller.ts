import { Request, Response } from "express";
import Contact from "../models/Contact";
import sendEmail from "../utils/sendEmail";

export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    await sendEmail(
  "New Portfolio Contact Message",
  `
  <h2>New Contact Message</h2>
  <p><b>Name:</b> ${contact.name}</p>
  <p><b>Email:</b> ${contact.email}</p>
  <p><b>Subject:</b> ${contact.subject}</p>
  <p><b>Message:</b> ${contact.message}</p>
  `
    );
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const getContacts = async (_req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
};

export const deleteContact = async (req: Request, res: Response) => {
  await Contact.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Message deleted successfully",
  });
};