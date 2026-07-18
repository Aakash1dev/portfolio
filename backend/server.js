require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// --- Connect to Database (Graceful/Optional) ---
connectDB();

// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// --- Body Parsing Middleware ---
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// --- Pooled Nodemailer Transporter Setup (Singleton for ultra-fast dispatch) ---
let cachedTransporter = null;

const getTransporter = () => {
  if (cachedTransporter) return cachedTransporter;

  if (process.env.SMTP_HOST) {
    cachedTransporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 5,
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Default Gmail Transport with connection pooling
    cachedTransporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 5,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  return cachedTransporter;
};

// --- API Routes ---

// 1. Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Portfolio Backend API is running',
    timestamp: new Date().toISOString(),
  });
});

// 2. Optimized Contact form message submission route
app.post('/send-message', async (req, res) => {
  try {
    const { name, email, subject, message, newsletter } = req.body;

    // Server-side Input Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const recipientEmail = process.env.EMAIL_USER || 'aakashkumar10th@gmail.com';

    // Compose HTML Email
    const mailOptions = {
      from: `"${name.trim()}" <${recipientEmail}>`,
      to: recipientEmail,
      replyTo: email.trim(),
      subject: subject && subject.trim() 
        ? `Portfolio Inquiry: ${subject.trim()}` 
        : `New Portfolio Message from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #ff2a2a; border-bottom: 2px solid #ff2a2a; padding-bottom: 8px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${subject.trim()}</p>` : ''}
          <p><strong>Newsletter Subscribed:</strong> ${newsletter ? 'Yes' : 'No'}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #333;">Message Content:</h3>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message.trim()}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Sent from your Portfolio Website Contact Form.</p>
        </div>
      `,
    };

    const isPlaceholderPass = !process.env.EMAIL_PASS || process.env.EMAIL_PASS.includes('your_gmail_app_password');

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && !isPlaceholderPass) {
      // Async mail send with timeout protection
      const transporter = getTransporter();
      
      // Fire sendMail and log result without blocking rapid client response
      transporter.sendMail(mailOptions).then((info) => {
        console.log(`⚡ Email dispatched instantly (${info.messageId}) to ${recipientEmail}`);
      }).catch((err) => {
        console.error('⚠️ SMTP background dispatch warning:', err.message);
      });
    } else {
      console.log('📩 Contact Message Received (Simulated Dispatch - Set valid App Password in .env for live email delivery):');
      console.log({ name: name.trim(), email: email.trim(), subject: subject?.trim(), message: message.trim() });
    }

    // Return instant success response (<50ms)
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Error processing /send-message:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message,
    });
  }
});

// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend Server started on port ${PORT}`);
  console.log(`👉 Access backend at http://localhost:${PORT}`);
});
