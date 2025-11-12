import type { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
});

// Configure storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'journal_images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    resource_type: 'auto'
  } as any
});

export const upload = multer({ storage });

// Controller function
export const uploadImage = async (req: Request, res: Response) => {
  try {
    // Multer + Cloudinary already handle the upload
    const file = req.file as any;
    res.status(200).json({ url: file.path });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};
