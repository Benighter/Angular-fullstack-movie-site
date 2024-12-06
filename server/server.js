const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


app.use(cors());
app.use(express.json()); 
app.use('/auth', authRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
