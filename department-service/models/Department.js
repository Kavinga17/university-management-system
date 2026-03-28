const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    departmentId: { type: String, required: true, unique: true, trim: true },
    departmentName: { type: String, required: true, trim: true },
    departmentCode: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    headOfDepartment: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', departmentSchema);
