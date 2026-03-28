const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routes/students');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Swagger Documentation ─────────────────────────────────────────────────────
swaggerDocs(app);

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/students', studentRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    service: 'Student Service',
    status: 'Running ✅',
    port: PORT,
    swagger: `http://localhost:${PORT}/api-docs`,
  });
});

// ─── MongoDB Connection ────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_db';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB — student_db');
    app.listen(PORT, () => {
      console.log(`🚀 Student Service running on http://localhost:${PORT}`);
      console.log(`📄 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
