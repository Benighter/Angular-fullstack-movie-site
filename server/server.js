const express = require("express");
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

// Configure CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Create a route for testing the connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
