import type { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// 1️⃣ Load environment variables
dotenv.config();

// 2️⃣ Initialize OpenAI client with your secret key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 3️⃣ Define the handler that Express will call
export const handlePrompt = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // 4️⃣ Use the client to call OpenAI
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4-turbo'
      messages: [
        { role: 'system', content: 'You are a helpful caption generator for a journaling app.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 50
    });

    const output = completion.choices[0]?.message?.content?.trim() || '';
    res.json({ response: output });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ message: 'Error generating caption' });
  }
};
