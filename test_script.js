import authHandler from './api/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const req = {
  method: 'POST',
  body: { email: 'himanshuvishwakarma516@gmail.com', password: 'ijxv7jgi' }
};

const res = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log(`Status: ${this.statusCode}`);
    console.log(`Response:`, data);
  }
};

(async () => {
  try {
    await authHandler(req, res);
  } catch (err) {
    console.error('Error:', err);
  }
})();
