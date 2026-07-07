import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

const uploadBufferToCloudinary = (
  buffer: Buffer,
  options: {
    folder: string;
    resource_type: "image" | "raw" | "auto";
    public_id?: string;
  }
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        ...options,
        timeout: 120000,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error("Image upload error:", error);

    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

export const uploadResume = async (req: Request, res: Response) => {
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
    });

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    res.status(500).json({
      success: false,
      message: "Resume upload failed",
    });
  }
};