import express from 'express';
import { upload, uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/upload
router.post('/', upload.single('image'), uploadImage);

export default router;
