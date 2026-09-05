const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Pothole, Water Leak, Streetlight, Garbage, Electricity
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, In Progress, Resolved
  userId: { type: String, required: true },
  imageUrl: { type: String, default: null }, // Cloudinary Image URL
  audioUrl: { type: String, default: null }, // Cloudinary Audio / Voice Note URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
