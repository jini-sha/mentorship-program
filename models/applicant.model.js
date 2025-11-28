const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  careerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  contactNumber: {
    type: String,
    required: true,
    unique: true
  },
  interestedField: {
    type: String,
    required: true,
    trim: true,
    enum: ["Backend", "Frontend", "Designing"]
  },
  level: { type: String, enum: ["4", "5", "6"] },
  course: { type: String, enum: ["BCS", "BCY", "BIBM"] },
  reason: { type: String, required: true, trim: true },
  appliedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Good Fit", "Maybe", "Not Fit"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Applicant", ApplicantSchema);
