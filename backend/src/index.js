require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// DB connection
connectDB();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // your React app or frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))

app.use(express.json());

// Routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
