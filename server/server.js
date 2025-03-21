const express = require("express");
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

// Configure CORS with specific options
app.use(cors({
  origin: true, // This will reflect the request origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// API routes with prefixes
app.use('/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', environment: process.env.VERCEL ? 'production' : 'development' });
});

// Handle Vercel serverless deployment
module.exports = app;
