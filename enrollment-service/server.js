const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const enrollmentRoutes = require('./routes/enrollments');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);
app.use('/enrollments', enrollmentRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Enrollment Service', status: 'Running ✅', port: PORT, swagger: `http://localhost:${PORT}/api-docs` });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/enrollment_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB — enrollment_db');
    app.listen(PORT, () => {
      console.log(`🚀 Enrollment Service running on http://localhost:${PORT}`);
      console.log(`📄 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => { console.error('❌ MongoDB connection failed:', err.message); process.exit(1); });
