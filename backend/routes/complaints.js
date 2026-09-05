const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// POST: Submit a new complaint
router.post('/', async (req, res) => {
  try {
    const { title, category, description, location, userId } = req.body;
    const newComplaint = new Complaint({
      title,
      category,
      description,
      location,
      userId
    });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit complaint', details: err.message });
  }
});

// GET: Fetch complaints for a specific citizen
router.get('/:userId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints', details: err.message });
  }
});

module.exports = router;
