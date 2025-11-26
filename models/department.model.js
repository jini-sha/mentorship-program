const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({

  subject: {
    type: String,
    required: true,
    trim: true,
    enum: ["Backend", "Frontend", "Designing"]
  },
  description: {
    type: String,
    required: true,
    trim: true
  },

  deadline: {
    type: Date,
    required: true
  },

  archived: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Department", DepartmentSchema);
