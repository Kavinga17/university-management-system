# 🎓 Student Service — University Management System

**Microservice for managing student records**  
IT4020 Modern Topics in IT — Assignment 2 | Member 1

---

## 📁 Folder Structure

```
student-service/
├── models/
│   └── Student.js        # Mongoose schema/model
├── routes/
│   └── students.js       # CRUD routes + Swagger annotations
├── .env                  # Environment variables
├── package.json
├── server.js             # Entry point
└── swagger.js            # Swagger config
```

---

## 🚀 How to Run

### 1. Install dependencies
```bash
cd student-service
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running locally on port `27017`.

### 3. Start the service
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Service runs on: `http://localhost:3001`

---

## 📄 API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | /students           | Get all students     |
| GET    | /students/:id       | Get student by ID    |
| POST   | /students           | Create new student   |
| PUT    | /students/:id       | Update student       |
| DELETE | /students/:id       | Delete student       |

---

## 📖 Swagger Documentation

- **Direct:** http://localhost:3001/api-docs
- **Via API Gateway:** http://localhost:3000/students/api-docs

---

## 📦 Sample POST Body

```json
{
  "studentId": "STU001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@university.lk",
  "dateOfBirth": "2000-05-15",
  "gender": "Male",
  "phone": "+94771234567",
  "address": "123 Main St, Colombo",
  "departmentId": "DEPT001",
  "enrollmentYear": 2022,
  "status": "Active"
}
```
