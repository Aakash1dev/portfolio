const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb_connection_string')) {
    console.log('ℹ️ MongoDB URI not configured. Skipping DB connection.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected successfully.');
  } catch (err) {
    console.error('⚠️ MongoDB Connection Error:', err.message);
  }
};

module.exports = connectDB;
