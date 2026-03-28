const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema(
  {
    instructorId: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    specialization: { type: String, trim: true },
    departmentId: { type: String, trim: true },
    qualification: { type: String, trim: true },
    status: { type: String, enum: ['Active', 'Inactive', 'OnLeave'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Instructor', instructorSchema);
