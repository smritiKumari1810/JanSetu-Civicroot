const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Pothole, Water Leak
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, In Progress, Resolved
  userId: { type: String, required: true }, // Simple ID for tracking
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
