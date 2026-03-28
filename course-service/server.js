const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const courseRoutes = require('./routes/courses');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);

app.use('/courses', courseRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Course Service', status: 'Running ✅', port: PORT, swagger: `http://localhost:${PORT}/api-docs` });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/course_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB — course_db');
    app.listen(PORT, () => {
      console.log(`🚀 Course Service running on http://localhost:${PORT}`);
      console.log(`📄 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
