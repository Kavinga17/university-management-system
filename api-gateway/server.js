const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ─── Service URLs ──────────────────────────────────────────────────────────────
const STUDENT_SERVICE    = 'http://localhost:3001';
const COURSE_SERVICE     = 'http://localhost:3002';
const INSTRUCTOR_SERVICE = 'http://localhost:3003';
const ENROLLMENT_SERVICE = 'http://localhost:3004';
const DEPARTMENT_SERVICE = 'http://localhost:3005';

// ─── Proxy Options Helper ──────────────────────────────────────────────────────
const proxyOptions = (target, pathPrefix) => ({
  target,
  changeOrigin: true,
  pathRewrite: { [`^/${pathPrefix}`]: '' },
  on: {
    error: (err, req, res) => {
      res.status(503).json({
        success: false,
        message: `${pathPrefix} service is unavailable. Make sure it is running.`,
      });
    },
  },
});

// ─── Routes — forward to each microservice ────────────────────────────────────

// /students/** → Student Service (port 3001)
app.use('/students', createProxyMiddleware(proxyOptions(STUDENT_SERVICE, 'students')));

// /courses/** → Course Service (port 3002)
app.use('/courses', createProxyMiddleware(proxyOptions(COURSE_SERVICE, 'courses')));

// /instructors/** → Instructor Service (port 3003)
app.use('/instructors', createProxyMiddleware(proxyOptions(INSTRUCTOR_SERVICE, 'instructors')));

// /enrollments/** → Enrollment Service (port 3004)
app.use('/enrollments', createProxyMiddleware(proxyOptions(ENROLLMENT_SERVICE, 'enrollments')));

// /departments/** → Department Service (port 3005)
app.use('/departments', createProxyMiddleware(proxyOptions(DEPARTMENT_SERVICE, 'departments')));

// ─── Gateway Health Check ─────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    service: 'API Gateway',
    status: 'Running ✅',
    port: PORT,
    routes: {
      students:    `http://localhost:${PORT}/students`,
      courses:     `http://localhost:${PORT}/courses`,
      instructors: `http://localhost:${PORT}/instructors`,
      enrollments: `http://localhost:${PORT}/enrollments`,
      departments: `http://localhost:${PORT}/departments`,
    },
    swagger: {
      students:    `http://localhost:${PORT}/students/api-docs`,
      courses:     `http://localhost:${PORT}/courses/api-docs`,
      instructors: `http://localhost:${PORT}/instructors/api-docs`,
      enrollments: `http://localhost:${PORT}/enrollments/api-docs`,
      departments: `http://localhost:${PORT}/departments/api-docs`,
    },
  });
});

// ─── Start Gateway ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
  console.log('');
  console.log('📡 Forwarding routes:');
  console.log(`   /students    → http://localhost:3001`);
  console.log(`   /courses     → http://localhost:3002`);
  console.log(`   /instructors → http://localhost:3003`);
  console.log(`   /enrollments → http://localhost:3004`);
  console.log(`   /departments → http://localhost:3005`);
  console.log('');
  console.log('📄 Swagger via Gateway:');
  console.log(`   http://localhost:${PORT}/students/api-docs`);
  console.log(`   http://localhost:${PORT}/courses/api-docs`);
  console.log(`   http://localhost:${PORT}/instructors/api-docs`);
  console.log(`   http://localhost:${PORT}/enrollments/api-docs`);
  console.log(`   http://localhost:${PORT}/departments/api-docs`);
});
