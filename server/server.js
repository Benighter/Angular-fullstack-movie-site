const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;
const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const cors = require('cors');


app.use(cors());
app.use(express.json()); 
app.use('/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
