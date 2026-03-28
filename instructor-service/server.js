const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const instructorRoutes = require('./routes/instructors');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);
app.use('/instructors', instructorRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Instructor Service', status: 'Running ✅', port: PORT, swagger: `http://localhost:${PORT}/api-docs` });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/instructor_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB — instructor_db');
    app.listen(PORT, () => {
      console.log(`🚀 Instructor Service running on http://localhost:${PORT}`);
      console.log(`📄 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => { console.error('❌ MongoDB connection failed:', err.message); process.exit(1); });
