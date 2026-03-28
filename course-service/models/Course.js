const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, unique: true, trim: true },
    courseName: { type: String, required: true, trim: true },
    courseCode: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    credits: { type: Number, required: true },
    departmentId: { type: String, trim: true },
    instructorId: { type: String, trim: true },
    duration: { type: String, trim: true },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Discontinued'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
