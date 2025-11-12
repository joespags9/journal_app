import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import journalRouter from './routes/journalRoutes.js';
import { upload, uploadImage } from './controllers/uploadController.js';
import uploadRouter from './routes/uploadRoutes.js'
import openAIRoutes from './routes/aiRoutes.js';

const app = express()

// Enable CORS for all routes
app.use(cors());

if (process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

// Upload route
app.use('/uploads', express.static('uploads'));
app.use('/api/upload', uploadRouter);

app.use('/api/openai', openAIRoutes);

app.use("/api",journalRouter)

export default app;