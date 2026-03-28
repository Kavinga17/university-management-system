# 🎓 University Management System — Microservices
IT4020 Modern Topics in IT | Assignment 2 | Group Project

---

## 📁 Project Structure

```
university-management/
├── api-gateway/          → Port 3000 (single entry point)
├── student-service/      → Port 3001 (Member 1)
├── course-service/       → Port 3002 (Member 2)
├── instructor-service/   → Port 3003 (Member 3)
├── enrollment-service/   → Port 3004 (Member 4)
└── department-service/   → Port 3005 (Member 5)
```

---

## ▶️ How to Run (Do this for EVERY service)

### Step 1 — Open 6 separate cmd terminals

### Step 2 — For each service, run:
```
cd student-service     (or course-service, etc.)
npm install
npm start
```

### Step 3 — Start the API Gateway last
```
cd api-gateway
npm install
npm start
```

---

## 🌐 Direct Access URLs (without gateway)

| Service | URL | Swagger |
|---|---|---|
| Student | http://localhost:3001 | http://localhost:3001/api-docs |
| Course | http://localhost:3002 | http://localhost:3002/api-docs |
| Instructor | http://localhost:3003 | http://localhost:3003/api-docs |
| Enrollment | http://localhost:3004 | http://localhost:3004/api-docs |
| Department | http://localhost:3005 | http://localhost:3005/api-docs |

---

## 🔀 Via API Gateway URLs (port 3000)

| Service | URL | Swagger |
|---|---|---|
| Student | http://localhost:3000/students | http://localhost:3000/students/api-docs |
| Course | http://localhost:3000/courses | http://localhost:3000/courses/api-docs |
| Instructor | http://localhost:3000/instructors | http://localhost:3000/instructors/api-docs |
| Enrollment | http://localhost:3000/enrollments | http://localhost:3000/enrollments/api-docs |
| Department | http://localhost:3000/departments | http://localhost:3000/departments/api-docs |

---

## 📋 API Endpoints (same pattern for all services)

| Method | Endpoint | Description |
|---|---|---|
| GET | /students | Get all students |
| GET | /students/:id | Get student by ID |
| POST | /students | Create new student |
| PUT | /students/:id | Update student |
| DELETE | /students/:id | Delete student |

---

## ⚠️ Requirements
- Node.js v18+
- MongoDB running locally on port 27017
