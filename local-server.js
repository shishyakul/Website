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

import manageUserHandler from './api/manageUser.js';

app.post('/api/manageUser', async (req, res) => {
  try {
    await manageUserHandler(req, res);
  } catch (err) {
    console.error("Local Server Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

import submitJobHandler from './api/submitJobApplication.js';

app.post('/api/submitJobApplication', async (req, res) => {
  try {
    await submitJobHandler(req, res);
  } catch (err) {
    console.error("Local Server Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

const PORT = 3000;
const HOST = '0.0.0.0'; // Bind to all network interfaces

app.listen(PORT, HOST, () => {
  console.log(`Local API server running at http://localhost:${PORT}`);
  
  // Also log the network IP for easy access
  import('os').then(os => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          console.log(`➜  Network: http://${iface.address}:${PORT}/`);
        }
      }
    }
  });
});
