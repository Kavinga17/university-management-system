const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    enrollmentId: { type: String, required: true, unique: true, trim: true },
    studentId: { type: String, required: true, trim: true },
    courseId: { type: String, required: true, trim: true },
    enrollmentDate: { type: Date, required: true },
    grade: { type: String, trim: true },
    status: { type: String, enum: ['Active', 'Completed', 'Dropped', 'Failed'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
