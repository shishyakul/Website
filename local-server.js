import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authHandler from './api/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mocking Vercel's req/res for our API route
app.post('/api/auth', async (req, res) => {
  // Pass to the Vercel handler
  try {
    await authHandler(req, res);
  } catch (err) {
    console.error("Local Server Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local API server running at http://localhost:${PORT}`);
});
