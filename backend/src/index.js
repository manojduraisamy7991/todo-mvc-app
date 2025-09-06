require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// DB connection
connectDB();

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",   // Vite dev
  "http://localhost:3000",   // CRA dev
  "https://todo-mvc-app.vercel.app/" // production
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.use(express.json());

// Routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
